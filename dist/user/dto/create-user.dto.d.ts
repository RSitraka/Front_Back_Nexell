import { UserRole } from '../enums/user-role.enum';
export declare class CreateUserDto {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    role: UserRole;
    siteId?: string;
}
