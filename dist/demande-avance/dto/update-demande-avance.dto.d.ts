import { CreateDemandeAvanceDto } from './create-demande-avance.dto';
import { StatutDemandeAvance } from '../demande-avance.entity';
declare const UpdateDemandeAvanceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDemandeAvanceDto>>;
export declare class UpdateDemandeAvanceDto extends UpdateDemandeAvanceDto_base {
    statut?: StatutDemandeAvance;
}
export {};
