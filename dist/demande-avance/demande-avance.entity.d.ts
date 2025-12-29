import { User } from '../user/user.entity';
import { Site } from '../site/site.entity';
export declare enum StatutDemandeAvance {
    EN_ATTENTE = "EN_ATTENTE",
    VALIDEE = "VALIDEE",
    REJETEE = "REJETEE"
}
export declare class DemandeAvance {
    id: string;
    montant: number;
    motif: string;
    statut: StatutDemandeAvance;
    demandeur: User;
    site: Site;
    createdAt: Date;
    updatedAt: Date;
}
