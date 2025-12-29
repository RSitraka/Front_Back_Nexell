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
exports.DemandeBudget = exports.StatutDemande = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../site/site.entity");
const user_entity_1 = require("../user/user.entity");
var StatutDemande;
(function (StatutDemande) {
    StatutDemande["EN_ATTENTE"] = "en_attente";
    StatutDemande["APPROUVEE"] = "approuvee";
    StatutDemande["REJETEE"] = "rejetee";
})(StatutDemande || (exports.StatutDemande = StatutDemande = {}));
let DemandeBudget = class DemandeBudget {
    id;
    motif;
    montant;
    statut;
    site;
    demandeur;
    valideur;
    createdAt;
    updatedAt;
};
exports.DemandeBudget = DemandeBudget;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DemandeBudget.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DemandeBudget.prototype, "motif", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], DemandeBudget.prototype, "montant", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StatutDemande,
        default: StatutDemande.EN_ATTENTE,
    }),
    __metadata("design:type", String)
], DemandeBudget.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.demandesBudget, { eager: true }),
    __metadata("design:type", site_entity_1.Site)
], DemandeBudget.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.demandesBudget, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], DemandeBudget.prototype, "demandeur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, eager: true }),
    __metadata("design:type", user_entity_1.User)
], DemandeBudget.prototype, "valideur", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DemandeBudget.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DemandeBudget.prototype, "updatedAt", void 0);
exports.DemandeBudget = DemandeBudget = __decorate([
    (0, typeorm_1.Entity)('demandes_budget')
], DemandeBudget);
//# sourceMappingURL=demande-budget.entity.js.map