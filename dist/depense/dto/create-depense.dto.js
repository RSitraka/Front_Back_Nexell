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
exports.CreateDepenseDto = void 0;
const class_validator_1 = require("class-validator");
const depense_entity_1 = require("../depense.entity");
class CreateDepenseDto {
    type;
    montant;
    description;
    periode;
    siteId;
    userId;
    demandeurId;
    employeId;
    materielId;
    vehiculeId;
}
exports.CreateDepenseDto = CreateDepenseDto;
__decorate([
    (0, class_validator_1.IsEnum)(depense_entity_1.TypeDepense),
    __metadata("design:type", String)
], CreateDepenseDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateDepenseDto.prototype, "montant", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDepenseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(depense_entity_1.PeriodeDepense),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDepenseDto.prototype, "periode", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDepenseDto.prototype, "siteId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDepenseDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDepenseDto.prototype, "demandeurId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDepenseDto.prototype, "employeId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDepenseDto.prototype, "materielId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDepenseDto.prototype, "vehiculeId", void 0);
//# sourceMappingURL=create-depense.dto.js.map