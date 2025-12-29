import { Repository } from 'typeorm';
import { DemandeAvance } from './demande-avance.entity';
import { CreateDemandeAvanceDto } from './dto/create-demande-avance.dto';
import { UpdateDemandeAvanceDto } from './dto/update-demande-avance.dto';
import { User } from '../user/user.entity';
import { Site } from '../site/site.entity';
import { DepenseService } from '../depense/depense.service';
import { Employe } from '../employe/employe.entity';
export declare class DemandeAvanceService {
    private repo;
    private employeRepo;
    private siteRepo;
    private depenseService;
    constructor(repo: Repository<DemandeAvance>, employeRepo: Repository<Employe>, siteRepo: Repository<Site>, depenseService: DepenseService);
    create(dto: CreateDemandeAvanceDto, user: User): Promise<DemandeAvance>;
    findAll(siteId?: string): Promise<DemandeAvance[]>;
    findOne(id: string): Promise<DemandeAvance>;
    update(id: string, dto: UpdateDemandeAvanceDto): Promise<DemandeAvance>;
    valider(id: string): Promise<DemandeAvance>;
    rejeter(id: string): Promise<DemandeAvance>;
}
