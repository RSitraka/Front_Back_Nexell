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
exports.DemandeMateriel = exports.StatutDemande = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const materiel_entity_1 = require("../materiel/materiel.entity");
const site_entity_1 = require("../site/site.entity");
var StatutDemande;
(function (StatutDemande) {
    StatutDemande["EN_ATTENTE"] = "EN_ATTENTE";
    StatutDemande["VALIDEE"] = "VALIDEE";
    StatutDemande["REJETEE"] = "REJETEE";
})(StatutDemande || (exports.StatutDemande = StatutDemande = {}));
let DemandeMateriel = class DemandeMateriel {
    id;
    materiel;
    quantite;
    motif;
    statut;
    justificatifUrl;
    demandeur;
    site;
    createdAt;
    updatedAt;
};
exports.DemandeMateriel = DemandeMateriel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DemandeMateriel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => materiel_entity_1.Materiel, (materiel) => materiel.demandes, {
        eager: false,
        nullable: false,
    }),
    __metadata("design:type", materiel_entity_1.Materiel)
], DemandeMateriel.prototype, "materiel", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], DemandeMateriel.prototype, "quantite", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DemandeMateriel.prototype, "motif", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        enum: StatutDemande,
        default: StatutDemande.EN_ATTENTE,
    }),
    __metadata("design:type", String)
], DemandeMateriel.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DemandeMateriel.prototype, "justificatifUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.demandesMateriel, {
        eager: false,
        nullable: false,
    }),
    __metadata("design:type", user_entity_1.User)
], DemandeMateriel.prototype, "demandeur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.demandesMateriel, {
        eager: false,
        nullable: false,
    }),
    __metadata("design:type", site_entity_1.Site)
], DemandeMateriel.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DemandeMateriel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DemandeMateriel.prototype, "updatedAt", void 0);
exports.DemandeMateriel = DemandeMateriel = __decorate([
    (0, typeorm_1.Entity)('demandes_materiel')
], DemandeMateriel);
//# sourceMappingURL=demande-materiel.entity.js.map