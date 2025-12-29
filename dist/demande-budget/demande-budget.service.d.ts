import { Repository } from 'typeorm';
import { DemandeBudget } from './demande-budget.entity';
import { CreateDemandeBudgetDto } from './dto/create-demande-budget.dto';
import { UpdateDemandeBudgetDto } from './dto/update-demande-budget.dto';
import { DepenseService } from '../depense/depense.service';
export declare class DemandeBudgetService {
    private readonly demandeRepo;
    private readonly depenseService;
    constructor(demandeRepo: Repository<DemandeBudget>, depenseService: DepenseService);
    create(dto: CreateDemandeBudgetDto): Promise<DemandeBudget>;
    findAll(): Promise<DemandeBudget[]>;
    findOne(id: string): Promise<DemandeBudget>;
    valider(id: string, dto: UpdateDemandeBudgetDto, valideurId: string): Promise<DemandeBudget>;
}
