import { Repository } from 'typeorm';
import { Depense } from './depense.entity';
import { CreateDepenseDto } from './dto/create-depense.dto';
import { DemandeMateriel } from '../demande-materiel/demande-materiel.entity';
import { Site } from '../site/site.entity';
import { Materiel } from '../materiel/materiel.entity';
import { Employe } from '../employe/employe.entity';
import { User } from '../user/user.entity';
import { Vehicule } from '../vehicule/vehicule.entity';
export declare class DepenseService {
    private depenseRepository;
    private siteRepo;
    private userRepo;
    private employeRepo;
    private materielRepo;
    private vehiculeRepo;
    constructor(depenseRepository: Repository<Depense>, siteRepo: Repository<Site>, userRepo: Repository<User>, employeRepo: Repository<Employe>, materielRepo: Repository<Materiel>, vehiculeRepo: Repository<Vehicule>);
    create(dto: CreateDepenseDto): Promise<Depense>;
    createDepenseFromDemande(demandeMateriel: DemandeMateriel): Promise<Depense>;
    findAll(): Promise<Depense[]>;
    findOne(id: string): Promise<Depense>;
    findBySite(siteId: string): Promise<Depense[]>;
    getMateriel(depenseId: string): Promise<any>;
    remove(id: string): Promise<void>;
}
