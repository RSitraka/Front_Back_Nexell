import { Repository } from 'typeorm';
import { Materiel } from './materiel.entity';
import { CreateMaterielDto } from './dto/create-materiel.dto';
import { UpdateMaterielDto } from './dto/update-materiel.dto';
import { DepenseService } from '../depense/depense.service';
import { FichierService } from '../fichier/fichier.service';
export declare class MaterielService {
    private materielRepository;
    private depenseService;
    private fichierService;
    constructor(materielRepository: Repository<Materiel>, depenseService: DepenseService, fichierService: FichierService);
    create(createMaterielDto: CreateMaterielDto): Promise<Materiel>;
    findAll(): Promise<Materiel[]>;
    findOne(id: string): Promise<Materiel>;
    findBySite(siteId: string): Promise<Materiel[]>;
    update(id: string, updateMaterielDto: UpdateMaterielDto): Promise<Materiel>;
    remove(id: string): Promise<void>;
    assignFacture(materielId: string, fichierId: string): Promise<void>;
}
