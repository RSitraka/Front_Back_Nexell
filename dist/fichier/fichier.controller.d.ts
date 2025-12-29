import { FichierService } from '../fichier/fichier.service';
import { CreateFichierDto } from './dto/create-fichier.dto';
import { UpdateFichierDto } from './dto/update-fichier.dto';
export declare class FichierController {
    private readonly FichierService;
    constructor(FichierService: FichierService);
    create(createfichierDto: CreateFichierDto): Promise<import("./fichier.entity").Fichier>;
    findAll(siteId?: string): Promise<import("./fichier.entity").Fichier[]>;
    findOne(id: string): Promise<import("./fichier.entity").Fichier>;
    update(id: string, updatefichierDto: UpdateFichierDto): Promise<import("./fichier.entity").Fichier>;
    remove(id: string): Promise<void>;
}
