"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const employe_module_1 = require("./employe/employe.module");
const materiel_module_1 = require("./materiel/materiel.module");
const site_module_1 = require("./site/site.module");
const vehicule_module_1 = require("./vehicule/vehicule.module");
const depense_module_1 = require("./depense/depense.module");
const photo_module_1 = require("./photo/photo.module");
const fichier_module_1 = require("./fichier/fichier.module");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const database_config_1 = require("./config/database.config");
const config_1 = require("@nestjs/config");
const demande_materiel_module_1 = require("./demande-materiel/demande-materiel.module");
const auth_module_1 = require("./auth/auth.module");
const demande_achat_module_1 = require("./demande-achat/demande-achat.module");
const demande_avance_module_1 = require("./demande-avance/demande-avance.module");
const demande_budget_module_1 = require("./demande-budget/demande-budget.module");
const livraison_module_1 = require("./livraison/livraison.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: database_config_1.databaseConfig,
                inject: [config_1.ConfigService],
            }),
            employe_module_1.EmployeModule,
            materiel_module_1.MaterielModule,
            site_module_1.SiteModule,
            vehicule_module_1.VehiculeModule,
            depense_module_1.DepenseModule,
            photo_module_1.PhotoModule,
            fichier_module_1.FichierModule,
            user_module_1.UserModule,
            demande_materiel_module_1.DemandeMaterielModule,
            auth_module_1.AuthModule,
            demande_achat_module_1.DemandeAchatModule,
            demande_avance_module_1.DemandeAvanceModule,
            demande_budget_module_1.DemandeBudgetModule,
            livraison_module_1.LivraisonModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map