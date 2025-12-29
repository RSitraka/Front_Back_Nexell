import { DemandeAchat } from '../demande-achat/demande-achat.entity';
import { Vehicule } from '../vehicule/vehicule.entity';
import { Site } from '../site/site.entity';
export declare enum StatutLivraison {
    EN_ATTENTE = "EN_ATTENTE",
    EN_ROUTE = "EN_ROUTE",
    LIVREE = "LIVREE"
}
export declare class Livraison {
    id: string;
    demandeAchat: DemandeAchat;
    vehicule: Vehicule;
    site: Site;
    statut: StatutLivraison;
    dateDepart: Date | null;
    dateArrivee: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
