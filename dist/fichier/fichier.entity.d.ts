import { Site } from '../site/site.entity';
export declare enum TypeFichier {
    SCAN_FACTURE = "Scan de facture",
    DOCUMENT = "Document",
    AUTRE = "Autre"
}
export declare class Fichier {
    id: string;
    url: string;
    type: TypeFichier;
    description: string;
    site: Site;
    uploadedAt: Date;
}
