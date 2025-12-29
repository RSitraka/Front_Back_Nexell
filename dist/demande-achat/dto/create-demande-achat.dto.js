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
exports.CreateDemandeAchatDto = void 0;
const class_validator_1 = require("class-validator");
const depense_entity_1 = require("../../depense/depense.entity");
class CreateDemandeAchatDto {
    nom;
    type;
    modele;
    prixEstime;
    fournisseur;
    description;
    siteId;
}
exports.CreateDemandeAchatDto = CreateDemandeAchatDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDemandeAchatDto.prototype, "nom", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(depense_entity_1.TypeDepense),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDemandeAchatDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDemandeAchatDto.prototype, "modele", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateDemandeAchatDto.prototype, "prixEstime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDemandeAchatDto.prototype, "fournisseur", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDemandeAchatDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDemandeAchatDto.prototype, "siteId", void 0);
//# sourceMappingURL=create-demande-achat.dto.js.map