import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { Site } from './site.entity';
import { Employe } from '../employe/employe.entity';
import { User } from '../user/user.entity';
import { Depense } from '../depense/depense.entity';
import { Photo } from '../photo/photo.entity';
import { Vehicule } from '../vehicule/vehicule.entity';
import { Materiel } from '../materiel/materiel.entity';
import { DemandeMateriel } from '../demande-materiel/demande-materiel.entity';
import { DemandeAchat } from '../demande-achat/demande-achat.entity';
import { DemandeAvance } from '../demande-avance/demande-avance.entity';
import { DemandeBudget } from '../demande-budget/demande-budget.entity';
import { Livraison } from '../livraison/livraison.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Site, Employe, User, Depense, Photo, Vehicule, Materiel,
    DemandeMateriel, DemandeAchat, DemandeAvance, DemandeBudget, Livraison,
  ])],
  controllers: [SiteController],
  providers: [SiteService],
  exports: [SiteService],
})
export class SiteModule {}
