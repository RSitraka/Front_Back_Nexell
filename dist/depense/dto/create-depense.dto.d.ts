import { TypeDepense, PeriodeDepense } from '../depense.entity';
export declare class CreateDepenseDto {
    type: TypeDepense;
    montant: number;
    description?: string;
    periode?: PeriodeDepense;
    siteId?: string;
    userId?: string;
    demandeurId?: string;
    employeId?: string;
    materielId?: string;
    vehiculeId?: string;
}
