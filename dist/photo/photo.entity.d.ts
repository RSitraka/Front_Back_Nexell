import { Site } from '../site/site.entity';
export declare class Photo {
    id: string;
    url: string;
    description: string;
    site: Site;
    uploadedAt: Date;
}
