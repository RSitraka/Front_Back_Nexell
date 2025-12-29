import { Repository } from 'typeorm';
import { Site } from './site.entity';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
export declare class SiteService {
    private siteRepository;
    constructor(siteRepository: Repository<Site>);
    create(createSiteDto: CreateSiteDto): Promise<Site>;
    findAll(): Promise<Site[]>;
    findOne(id: string): Promise<Site>;
    getTotalDepenses(id: string): Promise<{
        total: number;
        parType: any;
    }>;
    update(id: string, updateSiteDto: UpdateSiteDto): Promise<Site>;
    remove(id: string): Promise<void>;
}
