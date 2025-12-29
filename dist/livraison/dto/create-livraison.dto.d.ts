import { StatutLivraison } from '../livraison.entity';
export declare class CreateLivraisonDto {
    demandeAchatId: string;
    vehiculeId: string;
    siteId: string;
    statut?: StatutLivraison;
    dateDepart?: string;
}
