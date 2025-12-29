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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLivraisonDto = void 0;
const class_validator_1 = require("class-validator");
const livraison_entity_1 = require("../livraison.entity");
class CreateLivraisonDto {
    demandeAchatId;
    vehiculeId;
    siteId;
    statut;
    dateDepart;
}
exports.CreateLivraisonDto = CreateLivraisonDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLivraisonDto.prototype, "demandeAchatId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLivraisonDto.prototype, "vehiculeId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLivraisonDto.prototype, "siteId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(livraison_entity_1.StatutLivraison),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLivraisonDto.prototype, "statut", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLivraisonDto.prototype, "dateDepart", void 0);
//# sourceMappingURL=create-livraison.dto.js.map