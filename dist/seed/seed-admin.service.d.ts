import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
export declare class SeedAdminService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    seed(): Promise<void>;
}
