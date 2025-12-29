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
exports.EmployeController = void 0;
const common_1 = require("@nestjs/common");
const employe_service_1 = require("./employe.service");
const create_employe_dto_1 = require("./dto/create-employe.dto");
const update_employe_dto_1 = require("./dto/update-employe.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_role_enum_1 = require("../user/enums/user-role.enum");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let EmployeController = class EmployeController {
    employeService;
    constructor(employeService) {
        this.employeService = employeService;
    }
    create(dto) {
        return this.employeService.create(dto);
    }
    findAll(siteId) {
        if (siteId)
            return this.employeService.findBySite(siteId);
        return this.employeService.findAll();
    }
    findOne(id) {
        return this.employeService.findOne(id);
    }
    update(id, dto) {
        return this.employeService.update(id, dto);
    }
    remove(id) {
        return this.employeService.remove(id);
    }
};
exports.EmployeController = EmployeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.EMPLOYE, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employe_dto_1.CreateEmployeDto]),
    __metadata("design:returntype", void 0)
], EmployeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employe_dto_1.UpdateEmployeDto]),
    __metadata("design:returntype", void 0)
], EmployeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeController.prototype, "remove", null);
exports.EmployeController = EmployeController = __decorate([
    (0, common_1.Controller)('employes'),
    __metadata("design:paramtypes", [employe_service_1.EmployeService])
], EmployeController);
//# sourceMappingURL=employe.controller.js.map