import { Repository } from 'typeorm';
import { Employe } from './employe.entity';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { User } from '../user/user.entity';
import { Site } from '../site/site.entity';
export declare class EmployeService {
    private employeRepository;
    private userRepository;
    private siteRepository;
    constructor(employeRepository: Repository<Employe>, userRepository: Repository<User>, siteRepository: Repository<Site>);
    create(dto: CreateEmployeDto): Promise<User>;
    findAll(): Promise<Employe[]>;
    findOne(id: string): Promise<Employe>;
    findBySite(siteId: string): Promise<Employe[]>;
    update(id: string, dto: UpdateEmployeDto): Promise<Employe>;
    remove(id: string): Promise<void>;
}
