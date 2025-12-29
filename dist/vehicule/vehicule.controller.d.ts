import { VehiculeService } from '../vehicule/vehicule.service';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
export declare class vehiculeController {
    private readonly vehiculeService;
    constructor(vehiculeService: VehiculeService);
    create(createvehiculeDto: CreateVehiculeDto): Promise<import("./vehicule.entity").Vehicule>;
    findAll(siteId?: string): Promise<import("./vehicule.entity").Vehicule[]>;
    findOne(id: string): Promise<import("./vehicule.entity").Vehicule>;
    remove(id: string): Promise<void>;
}
