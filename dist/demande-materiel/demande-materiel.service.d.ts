import { Repository } from 'typeorm';
import { DemandeMateriel } from './demande-materiel.entity';
import { CreateDemandeMaterielDto } from './dto/create-demande-materiel.dto';
import { UpdateDemandeMaterielDto } from './dto/update-demande-materiel.dto';
import { User } from '../user/user.entity';
import { Materiel } from '../materiel/materiel.entity';
import { Site } from '../site/site.entity';
import { DepenseService } from '../depense/depense.service';
export declare class DemandeMaterielService {
    private demandeRepo;
    private materielRepo;
    private siteRepo;
    private depenseService;
    constructor(demandeRepo: Repository<DemandeMateriel>, materielRepo: Repository<Materiel>, siteRepo: Repository<Site>, depenseService: DepenseService);
    create(dto: CreateDemandeMaterielDto, user: User): Promise<DemandeMateriel>;
    findAll(siteId?: string): Promise<DemandeMateriel[]>;
    findOne(id: string): Promise<DemandeMateriel>;
    update(id: string, dto: UpdateDemandeMaterielDto): Promise<DemandeMateriel>;
    valider(id: string): Promise<DemandeMateriel>;
    rejeter(id: string): Promise<DemandeMateriel>;
}
