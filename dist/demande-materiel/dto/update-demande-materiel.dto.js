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
exports.UpdateDemandeMaterielDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_demande_materiel_dto_1 = require("./create-demande-materiel.dto");
const class_validator_1 = require("class-validator");
class UpdateDemandeMaterielDto extends (0, mapped_types_1.PartialType)(create_demande_materiel_dto_1.CreateDemandeMaterielDto) {
    statut;
}
exports.UpdateDemandeMaterielDto = UpdateDemandeMaterielDto;
__decorate([
    (0, class_validator_1.IsEnum)(['EN_ATTENTE', 'VALIDEE', 'REJETEE']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDemandeMaterielDto.prototype, "statut", void 0);
//# sourceMappingURL=update-demande-materiel.dto.js.map