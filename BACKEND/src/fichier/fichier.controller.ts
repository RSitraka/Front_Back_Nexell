import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FichierService } from '../fichier/fichier.service'; // Adjusted import path
import { CreateFichierDto } from './dto/create-fichier.dto';
import { UpdateFichierDto } from './dto/update-fichier.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptionsFiles } from '../config/multer/config';

@Controller('fichiers')
export class FichierController {
  constructor(private readonly FichierService: FichierService) { }

  @Post()
  @UseInterceptors(FileInterceptor('pdf', multerOptionsFiles))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFichierDto,
  ) {
    dto.url = file.path.replace(/\\/g, '/');
    return this.FichierService.create(dto);
  }


  @Get()
  findAll(@Query('siteId') siteId?: string) {
    if (siteId) {
      return this.FichierService.findBySite(siteId);
    }
    return this.FichierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.FichierService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatefichierDto: UpdateFichierDto) {
  //   return this.FichierService.update(id, updatefichierDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.FichierService.remove(id);
  }
}
