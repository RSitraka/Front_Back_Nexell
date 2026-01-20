import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateMaterielDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  nomFournisseur: string;

  @IsNumber()
  @IsNotEmpty()
  prix: number;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  modele: string;

  @IsUUID()
  @IsOptional()
  siteId?: string;
}
