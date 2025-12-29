import { Repository } from 'typeorm';
import { Vehicule } from './vehicule.entity';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
export declare class VehiculeService {
    private VehiculeRepository;
    constructor(VehiculeRepository: Repository<Vehicule>);
    create(createVehiculeDto: CreateVehiculeDto): Promise<Vehicule>;
    findAll(): Promise<Vehicule[]>;
    findOne(id: string): Promise<Vehicule>;
    findBySite(siteId: string): Promise<Vehicule[]>;
    remove(id: string): Promise<void>;
}
