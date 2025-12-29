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
exports.FichierController = void 0;
const common_1 = require("@nestjs/common");
const fichier_service_1 = require("../fichier/fichier.service");
const create_fichier_dto_1 = require("./dto/create-fichier.dto");
const update_fichier_dto_1 = require("./dto/update-fichier.dto");
let FichierController = class FichierController {
    FichierService;
    constructor(FichierService) {
        this.FichierService = FichierService;
    }
    create(createfichierDto) {
        return this.FichierService.create(createfichierDto);
    }
    findAll(siteId) {
        if (siteId) {
            return this.FichierService.findBySite(siteId);
        }
        return this.FichierService.findAll();
    }
    findOne(id) {
        return this.FichierService.findOne(id);
    }
    update(id, updatefichierDto) {
        return this.FichierService.update(id, updatefichierDto);
    }
    remove(id) {
        return this.FichierService.remove(id);
    }
};
exports.FichierController = FichierController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fichier_dto_1.CreateFichierDto]),
    __metadata("design:returntype", void 0)
], FichierController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FichierController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FichierController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_fichier_dto_1.UpdateFichierDto]),
    __metadata("design:returntype", void 0)
], FichierController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FichierController.prototype, "remove", null);
exports.FichierController = FichierController = __decorate([
    (0, common_1.Controller)('fichiers'),
    __metadata("design:paramtypes", [fichier_service_1.FichierService])
], FichierController);
//# sourceMappingURL=fichier.controller.js.map