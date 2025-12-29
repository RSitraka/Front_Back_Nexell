import { CreateDemandeAchatDto } from './create-demande-achat.dto';
import { StatutDemandeAchat } from '../demande-achat.entity';
declare const UpdateDemandeAchatDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDemandeAchatDto>>;
export declare class UpdateDemandeAchatDto extends UpdateDemandeAchatDto_base {
    statut?: StatutDemandeAchat;
}
export {};
