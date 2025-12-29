import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
export declare class SiteController {
    private readonly siteService;
    constructor(siteService: SiteService);
    create(createSiteDto: CreateSiteDto): Promise<import("./site.entity").Site>;
    findAll(): Promise<import("./site.entity").Site[]>;
    findOne(id: string): Promise<import("./site.entity").Site>;
    getTotalDepenses(id: string): Promise<{
        total: number;
        parType: any;
    }>;
    update(id: string, updateSiteDto: UpdateSiteDto): Promise<import("./site.entity").Site>;
    remove(id: string): Promise<void>;
}
