import { MaterielService } from './materiel.service';
import { CreateMaterielDto } from './dto/create-materiel.dto';
import { UpdateMaterielDto } from './dto/update-materiel.dto';
export declare class MaterielController {
    private readonly materielService;
    constructor(materielService: MaterielService);
    create(createMaterielDto: CreateMaterielDto): Promise<import("./materiel.entity").Materiel>;
    findAll(siteId?: string): Promise<import("./materiel.entity").Materiel[]>;
    findOne(id: string): Promise<import("./materiel.entity").Materiel>;
    update(id: string, updateMaterielDto: UpdateMaterielDto): Promise<import("./materiel.entity").Materiel>;
    remove(id: string): Promise<void>;
}
