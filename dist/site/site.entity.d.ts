import { Employe } from '../employe/employe.entity';
import { Materiel } from '../materiel/materiel.entity';
import { Vehicule } from '../vehicule/vehicule.entity';
import { Depense } from '../depense/depense.entity';
import { Photo } from '../photo/photo.entity';
import { Fichier } from '../fichier/fichier.entity';
import { User } from '../user/user.entity';
import { DemandeMateriel } from '../demande-materiel/demande-materiel.entity';
import { DemandeAchat } from '../demande-achat/demande-achat.entity';
import { DemandeAvance } from '../demande-avance/demande-avance.entity';
import { DemandeBudget } from '../demande-budget/demande-budget.entity';
export declare enum TypeTravail {
    CALIBRAGE = "Calibrage",
    INSTALLATION = "Installation",
    MAINTENANCE = "Maintenance"
}
export declare enum StatutSite {
    EN_COURS = "En cours",
    TERMINE = "Termin\u00E9",
    SUSPENDU = "Suspendu"
}
export declare class Site {
    id: string;
    typeTravail: TypeTravail;
    localisation: string;
    coordonneesGPS: string;
    description: string;
    statut: StatutSite;
    employes: Employe[];
    demandesAvance: DemandeAvance[];
    materiels: Materiel[];
    vehicules: Vehicule[];
    depenses: Depense[];
    demandesAchat: DemandeAchat[];
    demandesBudget: DemandeBudget[];
    photos: Photo[];
    fichiers: Fichier[];
    demandesMateriel: DemandeMateriel[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
    static siteId: string;
}
