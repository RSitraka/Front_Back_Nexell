import { DemandeMaterielService } from './demande-materiel.service';
import { CreateDemandeMaterielDto } from './dto/create-demande-materiel.dto';
import { UpdateDemandeMaterielDto } from './dto/update-demande-materiel.dto';
export declare class DemandeMaterielController {
    private readonly service;
    constructor(service: DemandeMaterielService);
    create(dto: CreateDemandeMaterielDto, req: any): Promise<import("./demande-materiel.entity").DemandeMateriel>;
    findAll(siteId?: string): Promise<import("./demande-materiel.entity").DemandeMateriel[]>;
    findOne(id: string): Promise<import("./demande-materiel.entity").DemandeMateriel>;
    update(id: string, dto: UpdateDemandeMaterielDto): Promise<import("./demande-materiel.entity").DemandeMateriel>;
    valider(id: string): Promise<import("./demande-materiel.entity").DemandeMateriel>;
    rejeter(id: string): Promise<import("./demande-materiel.entity").DemandeMateriel>;
}
