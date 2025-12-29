import { DemandeBudgetService } from './demande-budget.service';
import { CreateDemandeBudgetDto } from './dto/create-demande-budget.dto';
import { UpdateDemandeBudgetDto } from './dto/update-demande-budget.dto';
export declare class DemandeBudgetController {
    private readonly demandeBudgetService;
    constructor(demandeBudgetService: DemandeBudgetService);
    create(dto: CreateDemandeBudgetDto): Promise<import("./demande-budget.entity").DemandeBudget>;
    findAll(): Promise<import("./demande-budget.entity").DemandeBudget[]>;
    findOne(id: string): Promise<import("./demande-budget.entity").DemandeBudget>;
    valider(id: string, dto: UpdateDemandeBudgetDto, req: any): Promise<import("./demande-budget.entity").DemandeBudget>;
}
