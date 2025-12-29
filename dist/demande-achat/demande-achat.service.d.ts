import { Repository } from 'typeorm';
import { DemandeAchat } from './demande-achat.entity';
import { CreateDemandeAchatDto } from './dto/create-demande-achat.dto';
import { UpdateDemandeAchatDto } from './dto/update-demande-achat.dto';
import { User } from '../user/user.entity';
import { Site } from '../site/site.entity';
import { DepenseService } from '../depense/depense.service';
import { DemandeBudgetService } from '../demande-budget/demande-budget.service';
import { Materiel } from '../materiel/materiel.entity';
export declare class DemandeAchatService {
    private repo;
    private siteRepo;
    private materielRepo;
    private depenseService;
    private demandeBudgetService;
    constructor(repo: Repository<DemandeAchat>, siteRepo: Repository<Site>, materielRepo: Repository<Materiel>, depenseService: DepenseService, demandeBudgetService: DemandeBudgetService);
    create(dto: CreateDemandeAchatDto, user: User): Promise<DemandeAchat>;
    valider(id: string, valideur: User): Promise<DemandeAchat>;
    findAll(siteId?: string): Promise<DemandeAchat[]>;
    findOne(id: string): Promise<DemandeAchat>;
    update(id: string, dto: UpdateDemandeAchatDto): Promise<DemandeAchat>;
    rejeter(id: string): Promise<DemandeAchat>;
}
