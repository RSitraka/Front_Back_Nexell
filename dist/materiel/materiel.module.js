"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterielModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const materiel_service_1 = require("./materiel.service");
const materiel_controller_1 = require("./materiel.controller");
const materiel_entity_1 = require("./materiel.entity");
const depense_module_1 = require("../depense/depense.module");
const fichier_module_1 = require("../fichier/fichier.module");
let MaterielModule = class MaterielModule {
};
exports.MaterielModule = MaterielModule;
exports.MaterielModule = MaterielModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([materiel_entity_1.Materiel]), depense_module_1.DepenseModule, fichier_module_1.FichierModule],
        controllers: [materiel_controller_1.MaterielController],
        providers: [materiel_service_1.MaterielService],
        exports: [materiel_service_1.MaterielService],
    })
], MaterielModule);
//# sourceMappingURL=materiel.module.js.map