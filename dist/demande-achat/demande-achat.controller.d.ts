import { DemandeAchatService } from './demande-achat.service';
import { CreateDemandeAchatDto } from './dto/create-demande-achat.dto';
import { UpdateDemandeAchatDto } from './dto/update-demande-achat.dto';
export declare class DemandeAchatController {
    private readonly service;
    constructor(service: DemandeAchatService);
    create(dto: CreateDemandeAchatDto, req: any): Promise<import("./demande-achat.entity").DemandeAchat>;
    findAll(siteId?: string): Promise<import("./demande-achat.entity").DemandeAchat[]>;
    findOne(id: string): Promise<import("./demande-achat.entity").DemandeAchat>;
    update(id: string, dto: UpdateDemandeAchatDto): Promise<import("./demande-achat.entity").DemandeAchat>;
    valider(id: string, req: any): Promise<import("./demande-achat.entity").DemandeAchat>;
    rejeter(id: string): Promise<import("./demande-achat.entity").DemandeAchat>;
}
