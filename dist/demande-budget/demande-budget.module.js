"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeBudgetModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const demande_budget_entity_1 = require("./demande-budget.entity");
const depense_entity_1 = require("../depense/depense.entity");
const demande_budget_service_1 = require("./demande-budget.service");
const demande_budget_controller_1 = require("./demande-budget.controller");
const user_module_1 = require("../user/user.module");
const depense_module_1 = require("../depense/depense.module");
const site_module_1 = require("../site/site.module");
const vehicule_module_1 = require("../vehicule/vehicule.module");
let DemandeBudgetModule = class DemandeBudgetModule {
};
exports.DemandeBudgetModule = DemandeBudgetModule;
exports.DemandeBudgetModule = DemandeBudgetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([demande_budget_entity_1.DemandeBudget, depense_entity_1.Depense]),
            depense_module_1.DepenseModule,
            user_module_1.UserModule,
            site_module_1.SiteModule,
            vehicule_module_1.VehiculeModule,
        ],
        controllers: [demande_budget_controller_1.DemandeBudgetController],
        providers: [demande_budget_service_1.DemandeBudgetService],
        exports: [demande_budget_service_1.DemandeBudgetService],
    })
], DemandeBudgetModule);
//# sourceMappingURL=demande-budget.module.js.map