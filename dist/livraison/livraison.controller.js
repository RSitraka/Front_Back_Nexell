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
exports.LivraisonController = void 0;
const common_1 = require("@nestjs/common");
const livraison_service_1 = require("./livraison.service");
const create_livraison_dto_1 = require("./dto/create-livraison.dto");
const update_livraison_dto_1 = require("./dto/update-livraison.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_enum_1 = require("../user/enums/user-role.enum");
let LivraisonController = class LivraisonController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    valider(id, req) {
        const user = req.user;
        return this.service.valider(id, user);
    }
};
exports.LivraisonController = LivraisonController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.LOGISTIC, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_livraison_dto_1.CreateLivraisonDto]),
    __metadata("design:returntype", void 0)
], LivraisonController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LivraisonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LivraisonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_livraison_dto_1.UpdateLivraisonDto]),
    __metadata("design:returntype", void 0)
], LivraisonController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/valider'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LivraisonController.prototype, "valider", null);
exports.LivraisonController = LivraisonController = __decorate([
    (0, common_1.Controller)('livraisons'),
    __metadata("design:paramtypes", [livraison_service_1.LivraisonService])
], LivraisonController);
//# sourceMappingURL=livraison.controller.js.map