"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepenseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const depense_service_1 = require("./depense.service");
const depense_controller_1 = require("./depense.controller");
const depense_entity_1 = require("./depense.entity");
const site_entity_1 = require("../site/site.entity");
const user_entity_1 = require("../user/user.entity");
const employe_entity_1 = require("../employe/employe.entity");
const materiel_entity_1 = require("../materiel/materiel.entity");
const vehicule_entity_1 = require("../vehicule/vehicule.entity");
let DepenseModule = class DepenseModule {
};
exports.DepenseModule = DepenseModule;
exports.DepenseModule = DepenseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                depense_entity_1.Depense,
                site_entity_1.Site,
                user_entity_1.User,
                employe_entity_1.Employe,
                materiel_entity_1.Materiel,
                vehicule_entity_1.Vehicule,
            ]),
        ],
        controllers: [depense_controller_1.DepenseController],
        providers: [depense_service_1.DepenseService],
        exports: [depense_service_1.DepenseService],
    })
], DepenseModule);
//# sourceMappingURL=depense.module.js.map