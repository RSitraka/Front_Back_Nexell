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
exports.Materiel = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../site/site.entity");
const depense_entity_1 = require("../depense/depense.entity");
const demande_materiel_entity_1 = require("../demande-materiel/demande-materiel.entity");
let Materiel = class Materiel {
    id;
    nomFournisseur;
    prix;
    nom;
    modele;
    site;
    demandes;
    depenses;
    createdAt;
    updatedAt;
};
exports.Materiel = Materiel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Materiel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materiel.prototype, "nomFournisseur", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Materiel.prototype, "prix", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materiel.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materiel.prototype, "modele", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.materiels, { nullable: true }),
    __metadata("design:type", site_entity_1.Site)
], Materiel.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demande_materiel_entity_1.DemandeMateriel, (demande) => demande.materiel),
    __metadata("design:type", Array)
], Materiel.prototype, "demandes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => depense_entity_1.Depense, (depense) => depense.materiel),
    __metadata("design:type", Array)
], Materiel.prototype, "depenses", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Materiel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Materiel.prototype, "updatedAt", void 0);
exports.Materiel = Materiel = __decorate([
    (0, typeorm_1.Entity)('materiels')
], Materiel);
//# sourceMappingURL=materiel.entity.js.map