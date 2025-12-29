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
exports.DemandeAchat = exports.StatutDemandeAchat = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const site_entity_1 = require("../site/site.entity");
var StatutDemandeAchat;
(function (StatutDemandeAchat) {
    StatutDemandeAchat["EN_ATTENTE"] = "EN_ATTENTE";
    StatutDemandeAchat["EN_COURS"] = "EN_COURS";
    StatutDemandeAchat["VALIDEE"] = "VALIDEE";
    StatutDemandeAchat["REJETEE"] = "REJETEE";
})(StatutDemandeAchat || (exports.StatutDemandeAchat = StatutDemandeAchat = {}));
let DemandeAchat = class DemandeAchat {
    id;
    nom;
    modele;
    prixEstime;
    fournisseur;
    description;
    statut;
    demandeur;
    site;
    createdAt;
    updatedAt;
    valideur;
};
exports.DemandeAchat = DemandeAchat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DemandeAchat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DemandeAchat.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DemandeAchat.prototype, "modele", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DemandeAchat.prototype, "prixEstime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DemandeAchat.prototype, "fournisseur", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DemandeAchat.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StatutDemandeAchat,
        default: StatutDemandeAchat.EN_ATTENTE,
    }),
    __metadata("design:type", String)
], DemandeAchat.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.demandesAchat),
    __metadata("design:type", user_entity_1.User)
], DemandeAchat.prototype, "demandeur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.demandesAchat),
    __metadata("design:type", site_entity_1.Site)
], DemandeAchat.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DemandeAchat.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DemandeAchat.prototype, "updatedAt", void 0);
exports.DemandeAchat = DemandeAchat = __decorate([
    (0, typeorm_1.Entity)('demandes_achat')
], DemandeAchat);
//# sourceMappingURL=demande-achat.entity.js.map