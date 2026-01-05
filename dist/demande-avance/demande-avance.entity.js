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
exports.DemandeAvance = exports.StatutDemandeAvance = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const site_entity_1 = require("../site/site.entity");
var StatutDemandeAvance;
(function (StatutDemandeAvance) {
    StatutDemandeAvance["EN_ATTENTE"] = "EN_ATTENTE";
    StatutDemandeAvance["VALIDEE"] = "VALIDEE";
    StatutDemandeAvance["REJETEE"] = "REJETEE";
})(StatutDemandeAvance || (exports.StatutDemandeAvance = StatutDemandeAvance = {}));
let DemandeAvance = class DemandeAvance {
    id;
    montant;
    motif;
    statut;
    demandeur;
    site;
    createdAt;
    updatedAt;
};
exports.DemandeAvance = DemandeAvance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DemandeAvance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DemandeAvance.prototype, "montant", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DemandeAvance.prototype, "motif", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        enum: StatutDemandeAvance,
        default: StatutDemandeAvance.EN_ATTENTE,
    }),
    __metadata("design:type", String)
], DemandeAvance.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.demandesAvance),
    __metadata("design:type", user_entity_1.User)
], DemandeAvance.prototype, "demandeur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.demandesAvance, { nullable: true }),
    __metadata("design:type", site_entity_1.Site)
], DemandeAvance.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DemandeAvance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DemandeAvance.prototype, "updatedAt", void 0);
exports.DemandeAvance = DemandeAvance = __decorate([
    (0, typeorm_1.Entity)('demandes_avance')
], DemandeAvance);
//# sourceMappingURL=demande-avance.entity.js.map