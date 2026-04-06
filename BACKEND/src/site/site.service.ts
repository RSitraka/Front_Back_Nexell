import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './site.entity';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Employe } from '../employe/employe.entity';
import { User } from '../user/user.entity';
import { Depense } from '../depense/depense.entity';
import { Photo } from '../photo/photo.entity';
import { Vehicule } from '../vehicule/vehicule.entity';
import { Materiel } from '../materiel/materiel.entity';
import { DemandeMateriel } from '../demande-materiel/demande-materiel.entity';
import { DemandeAchat } from '../demande-achat/demande-achat.entity';
import { DemandeAvance } from '../demande-avance/demande-avance.entity';
import { DemandeBudget } from '../demande-budget/demande-budget.entity';
import { Livraison } from '../livraison/livraison.entity';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site)
    private siteRepository: Repository<Site>,
    @InjectRepository(Employe)
    private employeRepo: Repository<Employe>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Depense)
    private depenseRepo: Repository<Depense>,
    @InjectRepository(Photo)
    private photoRepo: Repository<Photo>,
    @InjectRepository(Vehicule)
    private vehiculeRepo: Repository<Vehicule>,
    @InjectRepository(Materiel)
    private materielRepo: Repository<Materiel>,
    @InjectRepository(DemandeMateriel)
    private demandeMaterielRepo: Repository<DemandeMateriel>,
    @InjectRepository(DemandeAchat)
    private demandeAchatRepo: Repository<DemandeAchat>,
    @InjectRepository(DemandeAvance)
    private demandeAvanceRepo: Repository<DemandeAvance>,
    @InjectRepository(DemandeBudget)
    private demandeBudgetRepo: Repository<DemandeBudget>,
    @InjectRepository(Livraison)
    private livraisonRepo: Repository<Livraison>,
  ) {}

  async create(createSiteDto: CreateSiteDto): Promise<Site> {
    const site = this.siteRepository.create(createSiteDto);
    return await this.siteRepository.save(site);
  }

  async findAll(): Promise<Site[]> {
    const sites = await this.siteRepository.find({
      relations: {
        employes: true,
        materiels: true,
        vehicules: true,
        depenses: true,
        demandesMateriel: {
          materiel: true,
        },
      },
    });

    // For each site, take the maximum of the stored depenseTotal and the
    // value computed from actual records. This corrects sites where depenses
    // were added after the last save, without breaking old sites that have no
    // Depense records yet.
    for (const site of sites) {
      const depTotal = (site.depenses ?? []).reduce(
        (sum, dep) => sum + Number(dep.montant),
        0,
      );
      const matTotal = (site.demandesMateriel ?? []).reduce(
        (sum, dm) =>
          sum + Number(dm.materiel?.prix ?? 0) * Number(dm.quantite ?? 0),
        0,
      );
      const computed = depTotal + matTotal;
      if (computed > Number(site.depenseTotal ?? 0)) {
        site.depenseTotal = computed;
      }
    }

    return sites;
  }

  async findOne(id: string): Promise<Site> {
    const site = await this.siteRepository.findOne({
      where: { id },
      relations: {
        employes: true,
        materiels: true,
        vehicules: true,
        depenses: {
          demandeur: true,
          employe: true,
        },
        photos: true,
        fichiers: true,
        demandesMateriel: {
          materiel: true,
          demandeur: true,
        },
      },
    });
  
    if (!site) {
      throw new NotFoundException(`Site non trouvé`);
    }

    // Recompute depenseTotal from actual records, taking the maximum of the
    // stored value and the computed one so that old sites without Depense
    // records are not reset to zero.
    const depTotal = (site.depenses ?? []).reduce(
      (sum, dep) => sum + Number(dep.montant),
      0,
    );
    const matTotal = (site.demandesMateriel ?? []).reduce(
      (sum, dm) =>
        sum + Number(dm.materiel?.prix ?? 0) * Number(dm.quantite ?? 0),
      0,
    );
    const computed = depTotal + matTotal;
    if (computed > Number(site.depenseTotal ?? 0)) {
      site.depenseTotal = computed;
    }

    return site;
  }
  

  async getTotalDepenses(id: string): Promise<{ total: number; parType: any }> {
    const site = await this.findOne(id);

    const total = site.depenses.reduce(
      (sum, depense) => sum + Number(depense.montant),
      0,
    );

    const parType = site.depenses.reduce((acc, depense) => {
      if (!acc[depense.type]) {
        acc[depense.type] = 0;
      }
      acc[depense.type] += Number(depense.montant);
      return acc;
    }, {});

    return { total, parType };
  }

  async update(id: string, updateSiteDto: UpdateSiteDto): Promise<Site> {
    const site = await this.findOne(id);
    // findOne already returns max(stored, computed); capture it before the dto overwrites it
    const prevTotal = Number(site.depenseTotal ?? 0);
    Object.assign(site, updateSiteDto);

    // Recompute from actual records and keep the highest value so historical
    // salary data is never lost (salary depenses may not exist for old sites)
    const depTotal = (site.depenses ?? []).reduce(
      (sum, dep) => sum + Number(dep.montant),
      0,
    );
    const matTotal = (site.demandesMateriel ?? []).reduce(
      (sum, dm) =>
        sum + Number(dm.materiel?.prix ?? 0) * Number(dm.quantite ?? 0),
      0,
    );
    const computed = depTotal + matTotal;
    site.depenseTotal = Math.max(prevTotal, computed);

    return await this.siteRepository.save(site);
  }

  async remove(id: string): Promise<void> {
    const site = await this.siteRepository.findOne({ where: { id } });
    if (!site) throw new NotFoundException(`Site avec l'ID ${id} non trouvé`);

    // Détacher les entités dont le siteId doit rester (SET NULL)
    await this.employeRepo.update({ site: { id } }, { site: null });
    await this.userRepo.update({ site: { id } } as any, { site: null } as any);
    await this.depenseRepo.update({ site: { id } } as any, { site: null } as any);
    await this.vehiculeRepo.update({ site: { id } } as any, { site: null } as any);
    await this.materielRepo.update({ site: { id } } as any, { site: null } as any);
    await this.demandeAvanceRepo.update({ site: { id } } as any, { site: null } as any);

    // Supprimer les entités liées au site (CASCADE)
    await this.photoRepo.delete({ site: { id } } as any);
    await this.demandeMaterielRepo.delete({ site: { id } } as any);
    // Livraisons must be deleted BEFORE demandeAchat — livraison has a FK to demandeAchat
    await this.livraisonRepo.delete({ site: { id } } as any);
    await this.demandeAchatRepo.delete({ site: { id } } as any);
    await this.demandeBudgetRepo.delete({ site: { id } } as any);

    await this.siteRepository.delete(id);
  }
}
