import { Repository } from 'typeorm';
import { Fichier } from './fichier.entity';
import { CreateFichierDto } from './dto/create-fichier.dto';
import { UpdateFichierDto } from './dto/update-fichier.dto';
export declare class FichierService {
    private fichierRepository;
    constructor(fichierRepository: Repository<Fichier>);
    create(createFichierDto: CreateFichierDto): Promise<Fichier>;
    findAll(): Promise<Fichier[]>;
    findOne(id: string): Promise<Fichier>;
    findBySite(siteId: string): Promise<Fichier[]>;
    update(id: string, updateFichierDto: UpdateFichierDto): Promise<Fichier>;
    remove(id: string): Promise<void>;
}
