import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
export declare class PhotoService {
    private PhotoRepository;
    constructor(PhotoRepository: Repository<Photo>);
    create(createPhotoDto: CreatePhotoDto): Promise<Photo>;
    findAll(): Promise<Photo[]>;
    findOne(id: string): Promise<Photo>;
    findBySite(siteId: string): Promise<Photo[]>;
    remove(id: string): Promise<void>;
}
