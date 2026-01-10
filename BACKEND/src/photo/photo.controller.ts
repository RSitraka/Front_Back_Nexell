import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
//import { UpdatephotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptionsPhotos } from '../config/multer/config';

@Controller('photos')
export class PhotoController {
  constructor(private readonly PhotoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('pdf', multerOptionsPhotos))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreatePhotoDto,
  ) {
    dto.url = file.path.replace(/\\/g, '/');
    return this.PhotoService.create(dto);
  }
  @Get()
  findAll(@Query('siteId') siteId?: string) {
    if (siteId) {
      return this.PhotoService.findBySite(siteId);
    }
    return this.PhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PhotoService.findOne(id);
  }

  /*@Patch(':id')
    update(@Param('id') id: string, @Body() updatephotoDto: UpdatephotoDto) {
      return this.PhotoService.update(id, updatephotoDto);
    }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.PhotoService.remove(id);
  }
}
