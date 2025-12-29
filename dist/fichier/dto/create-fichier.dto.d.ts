import { TypeFichier } from '../fichier.entity';
export declare class CreateFichierDto {
    url: string;
    type: TypeFichier;
    description?: string;
    siteId: string;
}
