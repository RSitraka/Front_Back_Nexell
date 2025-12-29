import { Site } from '../site/site.entity';
import { User } from '../user/user.entity';
export declare enum StatutDemande {
    EN_ATTENTE = "en_attente",
    APPROUVEE = "approuvee",
    REJETEE = "rejetee"
}
export declare class DemandeBudget {
    id: string;
    motif: string;
    montant: number;
    statut: StatutDemande;
    site: Site;
    demandeur: User;
    valideur?: User;
    createdAt: Date;
    updatedAt: Date;
}
