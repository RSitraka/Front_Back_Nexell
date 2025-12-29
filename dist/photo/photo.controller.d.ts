import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
export declare class PhotoController {
    private readonly PhotoService;
    constructor(PhotoService: PhotoService);
    create(createphotoDto: CreatePhotoDto): Promise<import("./photo.entity").Photo>;
    findAll(siteId?: string): Promise<import("./photo.entity").Photo[]>;
    findOne(id: string): Promise<import("./photo.entity").Photo>;
    remove(id: string): Promise<void>;
}
