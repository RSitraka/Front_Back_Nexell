"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeAchatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const demande_achat_entity_1 = require("./demande-achat.entity");
const demande_achat_service_1 = require("./demande-achat.service");
const demande_achat_controller_1 = require("./demande-achat.controller");
const site_entity_1 = require("../site/site.entity");
const depense_module_1 = require("../depense/depense.module");
const demande_budget_module_1 = require("../demande-budget/demande-budget.module");
const user_module_1 = require("../user/user.module");
const materiel_entity_1 = require("../materiel/materiel.entity");
let DemandeAchatModule = class DemandeAchatModule {
};
exports.DemandeAchatModule = DemandeAchatModule;
exports.DemandeAchatModule = DemandeAchatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                demande_achat_entity_1.DemandeAchat,
                site_entity_1.Site,
                materiel_entity_1.Materiel,
            ]),
            depense_module_1.DepenseModule,
            demande_budget_module_1.DemandeBudgetModule,
            user_module_1.UserModule,
        ],
        providers: [demande_achat_service_1.DemandeAchatService],
        controllers: [demande_achat_controller_1.DemandeAchatController],
        exports: [demande_achat_service_1.DemandeAchatService],
    })
], DemandeAchatModule);
//# sourceMappingURL=demande-achat.module.js.map