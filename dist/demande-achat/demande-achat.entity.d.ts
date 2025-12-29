import { User } from '../user/user.entity';
import { Site } from '../site/site.entity';
export declare enum StatutDemandeAchat {
    EN_ATTENTE = "EN_ATTENTE",
    EN_COURS = "EN_COURS",
    VALIDEE = "VALIDEE",
    REJETEE = "REJETEE"
}
export declare class DemandeAchat {
    id: string;
    nom: string;
    modele: string;
    prixEstime: number;
    fournisseur: string;
    description: string;
    statut: StatutDemandeAchat;
    demandeur: User;
    site: Site;
    createdAt: Date;
    updatedAt: Date;
    valideur: any;
}
