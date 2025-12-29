import { DemandeAvanceService } from './demande-avance.service';
import { CreateDemandeAvanceDto } from './dto/create-demande-avance.dto';
import { UpdateDemandeAvanceDto } from './dto/update-demande-avance.dto';
export declare class DemandeAvanceController {
    private readonly service;
    constructor(service: DemandeAvanceService);
    create(dto: CreateDemandeAvanceDto, req: any): Promise<import("./demande-avance.entity").DemandeAvance>;
    findAll(siteId?: string): Promise<import("./demande-avance.entity").DemandeAvance[]>;
    findOne(id: string): Promise<import("./demande-avance.entity").DemandeAvance>;
    update(id: string, dto: UpdateDemandeAvanceDto): Promise<import("./demande-avance.entity").DemandeAvance>;
    valider(id: string): Promise<import("./demande-avance.entity").DemandeAvance>;
    rejeter(id: string): Promise<import("./demande-avance.entity").DemandeAvance>;
}
