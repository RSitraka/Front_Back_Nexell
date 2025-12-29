import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
export declare class EmployeController {
    private readonly employeService;
    constructor(employeService: EmployeService);
    create(dto: CreateEmployeDto): Promise<import("../user/user.entity").User>;
    findAll(siteId?: string): Promise<import("./employe.entity").Employe[]>;
    findOne(id: string): Promise<import("./employe.entity").Employe>;
    update(id: string, dto: UpdateEmployeDto): Promise<import("./employe.entity").Employe>;
    remove(id: string): Promise<void>;
}
