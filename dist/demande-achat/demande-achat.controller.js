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
exports.DemandeAchatController = void 0;
const common_1 = require("@nestjs/common");
const demande_achat_service_1 = require("./demande-achat.service");
const create_demande_achat_dto_1 = require("./dto/create-demande-achat.dto");
const update_demande_achat_dto_1 = require("./dto/update-demande-achat.dto");
const user_role_enum_1 = require("../user/enums/user-role.enum");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DemandeAchatController = class DemandeAchatController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, req) {
        return this.service.create(dto, req.user);
    }
    findAll(siteId) {
        return this.service.findAll(siteId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    valider(id, req) {
        return this.service.valider(id, req.user);
    }
    rejeter(id) {
        return this.service.rejeter(id);
    }
};
exports.DemandeAchatController = DemandeAchatController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.EMPLOYE, user_role_enum_1.UserRole.LOGISTIC, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_demande_achat_dto_1.CreateDemandeAchatDto, Object]),
    __metadata("design:returntype", void 0)
], DemandeAchatController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemandeAchatController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemandeAchatController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_demande_achat_dto_1.UpdateDemandeAchatDto]),
    __metadata("design:returntype", void 0)
], DemandeAchatController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/valider'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE, user_role_enum_1.UserRole.LOGISTIC, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DemandeAchatController.prototype, "valider", null);
__decorate([
    (0, common_1.Patch)(':id/rejeter'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE, user_role_enum_1.UserRole.LOGISTIC),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemandeAchatController.prototype, "rejeter", null);
exports.DemandeAchatController = DemandeAchatController = __decorate([
    (0, common_1.Controller)('demandes-achat'),
    __metadata("design:paramtypes", [demande_achat_service_1.DemandeAchatService])
], DemandeAchatController);
//# sourceMappingURL=demande-achat.controller.js.map