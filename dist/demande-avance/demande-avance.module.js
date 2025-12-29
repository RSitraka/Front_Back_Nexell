"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeAvanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const demande_avance_entity_1 = require("./demande-avance.entity");
const demande_avance_service_1 = require("./demande-avance.service");
const demande_avance_controller_1 = require("./demande-avance.controller");
const site_entity_1 = require("../site/site.entity");
const depense_module_1 = require("../depense/depense.module");
const employe_entity_1 = require("../employe/employe.entity");
let DemandeAvanceModule = class DemandeAvanceModule {
};
exports.DemandeAvanceModule = DemandeAvanceModule;
exports.DemandeAvanceModule = DemandeAvanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([demande_avance_entity_1.DemandeAvance, site_entity_1.Site, employe_entity_1.Employe]),
            depense_module_1.DepenseModule,
        ],
        providers: [demande_avance_service_1.DemandeAvanceService],
        controllers: [demande_avance_controller_1.DemandeAvanceController],
        exports: [demande_avance_service_1.DemandeAvanceService],
    })
], DemandeAvanceModule);
//# sourceMappingURL=demande-avance.module.js.map