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
exports.MaterielController = void 0;
const common_1 = require("@nestjs/common");
const materiel_service_1 = require("./materiel.service");
const create_materiel_dto_1 = require("./dto/create-materiel.dto");
const update_materiel_dto_1 = require("./dto/update-materiel.dto");
let MaterielController = class MaterielController {
    materielService;
    constructor(materielService) {
        this.materielService = materielService;
    }
    create(createMaterielDto) {
        return this.materielService.create(createMaterielDto);
    }
    findAll(siteId) {
        if (siteId) {
            return this.materielService.findBySite(siteId);
        }
        return this.materielService.findAll();
    }
    findOne(id) {
        return this.materielService.findOne(id);
    }
    update(id, updateMaterielDto) {
        return this.materielService.update(id, updateMaterielDto);
    }
    remove(id) {
        return this.materielService.remove(id);
    }
};
exports.MaterielController = MaterielController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_materiel_dto_1.CreateMaterielDto]),
    __metadata("design:returntype", void 0)
], MaterielController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaterielController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaterielController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_materiel_dto_1.UpdateMaterielDto]),
    __metadata("design:returntype", void 0)
], MaterielController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaterielController.prototype, "remove", null);
exports.MaterielController = MaterielController = __decorate([
    (0, common_1.Controller)('materiels'),
    __metadata("design:paramtypes", [materiel_service_1.MaterielService])
], MaterielController);
//# sourceMappingURL=materiel.controller.js.map