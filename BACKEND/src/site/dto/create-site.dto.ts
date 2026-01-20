import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';
import { TypeTravail, StatutSite } from '../site.entity';
import { Type } from 'class-transformer';

export class CreateSiteDto {
  @IsEnum(TypeTravail)
  @IsNotEmpty()
  typeTravail: TypeTravail;

  @IsString()
  @IsNotEmpty()
  localisation: string;

  @IsString()
  @IsNotEmpty()
  coordonneesGPS: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  depenseTotal: number;
  
  @IsEnum(StatutSite)
  @IsOptional()
  statut?: StatutSite;
}
