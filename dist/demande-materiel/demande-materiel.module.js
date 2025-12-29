"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeMaterielModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const demande_materiel_entity_1 = require("./demande-materiel.entity");
const demande_materiel_service_1 = require("./demande-materiel.service");
const demande_materiel_controller_1 = require("./demande-materiel.controller");
const materiel_entity_1 = require("../materiel/materiel.entity");
const site_entity_1 = require("../site/site.entity");
const depense_module_1 = require("../depense/depense.module");
let DemandeMaterielModule = class DemandeMaterielModule {
};
exports.DemandeMaterielModule = DemandeMaterielModule;
exports.DemandeMaterielModule = DemandeMaterielModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([demande_materiel_entity_1.DemandeMateriel, materiel_entity_1.Materiel, site_entity_1.Site]),
            depense_module_1.DepenseModule,
        ],
        providers: [demande_materiel_service_1.DemandeMaterielService],
        controllers: [demande_materiel_controller_1.DemandeMaterielController],
        exports: [demande_materiel_service_1.DemandeMaterielService],
    })
], DemandeMaterielModule);
//# sourceMappingURL=demande-materiel.module.js.map