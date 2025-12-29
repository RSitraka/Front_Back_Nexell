import { LivraisonService } from './livraison.service';
import { CreateLivraisonDto } from './dto/create-livraison.dto';
import { UpdateLivraisonDto } from './dto/update-livraison.dto';
export declare class LivraisonController {
    private service;
    constructor(service: LivraisonService);
    create(dto: CreateLivraisonDto): Promise<import("./livraison.entity").Livraison>;
    findAll(): Promise<import("./livraison.entity").Livraison[]>;
    findOne(id: string): Promise<import("./livraison.entity").Livraison>;
    update(id: string, dto: UpdateLivraisonDto): Promise<import("./livraison.entity").Livraison>;
    valider(id: string, req: any): Promise<import("./livraison.entity").Livraison>;
}
