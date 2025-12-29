import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Employe } from '../employe/employe.entity';
import { Site } from '../site/site.entity';
export declare class UserService {
    private userRepository;
    private employeRepository;
    private siteRepository;
    constructor(userRepository: Repository<User>, employeRepository: Repository<Employe>, siteRepository: Repository<Site>);
    createUser(dto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    findBySite(siteId: string): Promise<User[]>;
    getMe(userId: string): Promise<User>;
}
