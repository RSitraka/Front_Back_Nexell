import { Site } from '../site/site.entity';
import { User } from '../user/user.entity';
import { Employe } from '../employe/employe.entity';
import { Materiel } from '../materiel/materiel.entity';
import { Vehicule } from '../vehicule/vehicule.entity';
export declare enum TypeDepense {
    LOCATION_CARBURANT = "Location + carburant de voiture",
    ACHAT_MATERIEL = "achat_materiel",
    MATERIEL = "Prix de mat\u00E9riels",
    SALAIRE = "Salaire employ\u00E9 (avec avance)",
    DELOCBUDGET_ACHAT = "Deblocage budget achat",
    AUTRE = "Autre"
}
export declare enum PeriodeDepense {
    SEMAINE = "semaine",
    MOIS = "mois"
}
export declare class Depense {
    id: string;
    type: TypeDepense;
    montant: number;
    description?: string | null;
    periode?: PeriodeDepense;
    materiel?: Materiel;
    site?: Site;
    user?: User;
    demandeur?: User;
    employe?: Employe;
    vehicules: Vehicule[];
    createdAt: Date;
    updatedAt: Date;
}
