import { User } from '../user/user.entity';
import { Materiel } from '../materiel/materiel.entity';
import { Site } from '../site/site.entity';
export declare enum StatutDemande {
    EN_ATTENTE = "EN_ATTENTE",
    VALIDEE = "VALIDEE",
    REJETEE = "REJETEE"
}
export declare class DemandeMateriel {
    id: string;
    materiel: Materiel;
    quantite: number;
    motif: string;
    statut: StatutDemande;
    justificatifUrl: string;
    demandeur: User;
    site: Site;
    createdAt: Date;
    updatedAt: Date;
}
