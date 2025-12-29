import { TypeDepense } from '../../depense/depense.entity';
export declare class CreateDemandeAchatDto {
    nom: string;
    type?: TypeDepense;
    modele: string;
    prixEstime: number;
    fournisseur: string;
    description: string;
    siteId: string;
}
