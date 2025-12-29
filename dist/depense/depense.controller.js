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
exports.DepenseController = void 0;
const common_1 = require("@nestjs/common");
const depense_service_1 = require("./depense.service");
const create_depense_dto_1 = require("./dto/create-depense.dto");
let DepenseController = class DepenseController {
    depenseService;
    constructor(depenseService) {
        this.depenseService = depenseService;
    }
    create(createDepenseDto) {
        return this.depenseService.create(createDepenseDto);
    }
    findAll(siteId) {
        if (siteId) {
            return this.depenseService.findBySite(siteId);
        }
        return this.depenseService.findAll();
    }
    findOne(id) {
        return this.depenseService.findOne(id);
    }
    getMateriel(id) {
        return this.depenseService.getMateriel(id);
    }
    remove(id) {
        return this.depenseService.remove(id);
    }
};
exports.DepenseController = DepenseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_depense_dto_1.CreateDepenseDto]),
    __metadata("design:returntype", void 0)
], DepenseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepenseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepenseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/materiel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepenseController.prototype, "getMateriel", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepenseController.prototype, "remove", null);
exports.DepenseController = DepenseController = __decorate([
    (0, common_1.Controller)('depenses'),
    __metadata("design:paramtypes", [depense_service_1.DepenseService])
], DepenseController);
//# sourceMappingURL=depense.controller.js.map