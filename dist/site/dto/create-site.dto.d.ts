import { TypeTravail, StatutSite } from '../site.entity';
export declare class CreateSiteDto {
    typeTravail: TypeTravail;
    localisation: string;
    coordonneesGPS: string;
    description?: string;
    statut?: StatutSite;
}
