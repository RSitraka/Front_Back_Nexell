import { Site } from '../site/site.entity';
import { Depense } from '../depense/depense.entity';
import { DemandeMateriel } from '../demande-materiel/demande-materiel.entity';
export declare class Materiel {
    id: string;
    nomFournisseur: string;
    prix: number;
    nom: string;
    modele: string;
    site: Site;
    demandes: DemandeMateriel[];
    depenses: Depense[];
    createdAt: Date;
    updatedAt: Date;
}
