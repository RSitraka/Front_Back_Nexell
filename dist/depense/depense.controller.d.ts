import { DepenseService } from './depense.service';
import { CreateDepenseDto } from './dto/create-depense.dto';
export declare class DepenseController {
    private readonly depenseService;
    constructor(depenseService: DepenseService);
    create(createDepenseDto: CreateDepenseDto): Promise<import("./depense.entity").Depense>;
    findAll(siteId?: string): Promise<import("./depense.entity").Depense[]>;
    findOne(id: string): Promise<import("./depense.entity").Depense>;
    getMateriel(id: string): Promise<any>;
    remove(id: string): Promise<void>;
}
