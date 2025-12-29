import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as requestWithUserInterface from '../auth/interfaces/request-with-user.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(dto: CreateUserDto): Promise<import("./user.entity").User>;
    findAll(siteId?: string): Promise<import("./user.entity").User[]>;
    getMe(req: requestWithUserInterface.RequestWithUser): Promise<import("./user.entity").User>;
    findOne(id: string): Promise<import("./user.entity").User>;
    update(id: string, dto: UpdateUserDto): Promise<import("./user.entity").User>;
    remove(id: string): Promise<void>;
}
