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
exports.Livraison = exports.StatutLivraison = void 0;
const typeorm_1 = require("typeorm");
const demande_achat_entity_1 = require("../demande-achat/demande-achat.entity");
const vehicule_entity_1 = require("../vehicule/vehicule.entity");
const site_entity_1 = require("../site/site.entity");
var StatutLivraison;
(function (StatutLivraison) {
    StatutLivraison["EN_ATTENTE"] = "EN_ATTENTE";
    StatutLivraison["EN_ROUTE"] = "EN_ROUTE";
    StatutLivraison["LIVREE"] = "LIVREE";
})(StatutLivraison || (exports.StatutLivraison = StatutLivraison = {}));
let Livraison = class Livraison {
    id;
    demandeAchat;
    vehicule;
    site;
    statut;
    dateDepart;
    dateArrivee;
    createdAt;
    updatedAt;
};
exports.Livraison = Livraison;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Livraison.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => demande_achat_entity_1.DemandeAchat, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'demandeAchatId' }),
    __metadata("design:type", demande_achat_entity_1.DemandeAchat)
], Livraison.prototype, "demandeAchat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicule_entity_1.Vehicule, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'vehiculeId' }),
    __metadata("design:type", vehicule_entity_1.Vehicule)
], Livraison.prototype, "vehicule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'siteId' }),
    __metadata("design:type", site_entity_1.Site)
], Livraison.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StatutLivraison,
        default: StatutLivraison.EN_ATTENTE,
    }),
    __metadata("design:type", String)
], Livraison.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Livraison.prototype, "dateDepart", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Livraison.prototype, "dateArrivee", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Livraison.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Livraison.prototype, "updatedAt", void 0);
exports.Livraison = Livraison = __decorate([
    (0, typeorm_1.Entity)('livraisons')
], Livraison);
//# sourceMappingURL=livraison.entity.js.map