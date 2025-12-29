import { CreateDemandeMaterielDto } from './create-demande-materiel.dto';
declare const UpdateDemandeMaterielDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDemandeMaterielDto>>;
export declare class UpdateDemandeMaterielDto extends UpdateDemandeMaterielDto_base {
    statut?: 'EN_ATTENTE' | 'VALIDEE' | 'REJETEE';
}
export {};
