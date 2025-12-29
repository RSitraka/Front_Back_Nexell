"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeBudgetController = void 0;
const common_1 = require("@nestjs/common");
const demande_budget_service_1 = require("./demande-budget.service");
const create_demande_budget_dto_1 = require("./dto/create-demande-budget.dto");
const update_demande_budget_dto_1 = require("./dto/update-demande-budget.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../user/enums/user-role.enum");
let DemandeBudgetController = class DemandeBudgetController {
    demandeBudgetService;
    constructor(demandeBudgetService) {
        this.demandeBudgetService = demandeBudgetService;
    }
    create(dto) {
        return this.demandeBudgetService.create(dto);
    }
    findAll() {
        return this.demandeBudgetService.findAll();
    }
    findOne(id) {
        return this.demandeBudgetService.findOne(id);
    }
    async valider(id, dto, req) {
        console.log('DTO reçu:', dto);
        console.log('Statut reçu:', dto.statut);
        console.log('Type de statut:', typeof dto.statut);
        const valideurId = req.user.id;
        return this.demandeBudgetService.valider(id, dto, valideurId);
    }
};
exports.DemandeBudgetController = DemandeBudgetController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.LOGISTIC, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_demande_budget_dto_1.CreateDemandeBudgetDto]),
    __metadata("design:returntype", void 0)
], DemandeBudgetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DemandeBudgetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemandeBudgetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/valider'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_demande_budget_dto_1.UpdateDemandeBudgetDto, Object]),
    __metadata("design:returntype", Promise)
], DemandeBudgetController.prototype, "valider", null);
exports.DemandeBudgetController = DemandeBudgetController = __decorate([
    (0, common_1.Controller)('demande-budget'),
    __metadata("design:paramtypes", [demande_budget_service_1.DemandeBudgetService])
], DemandeBudgetController);
//# sourceMappingURL=demande-budget.controller.js.map