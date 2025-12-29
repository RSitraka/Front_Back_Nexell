import { Site } from '../site/site.entity';
import { Depense } from '../depense/depense.entity';
export declare class Vehicule {
    id: string;
    numeroMatricule: string;
    montantDepenseCarburant: number;
    nomMarque: string;
    nomAgence?: string;
    numeroTelephoneConducteur: string;
    site?: Site;
    depense?: Depense;
    createdAt: Date;
    updatedAt: Date;
}
