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
exports.Vehicule = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../site/site.entity");
const depense_entity_1 = require("../depense/depense.entity");
let Vehicule = class Vehicule {
    id;
    numeroMatricule;
    montantDepenseCarburant;
    nomMarque;
    nomAgence;
    numeroTelephoneConducteur;
    site;
    depense;
    createdAt;
    updatedAt;
};
exports.Vehicule = Vehicule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Vehicule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicule.prototype, "numeroMatricule", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Vehicule.prototype, "montantDepenseCarburant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicule.prototype, "nomMarque", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vehicule.prototype, "nomAgence", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicule.prototype, "numeroTelephoneConducteur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.vehicules, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'siteId' }),
    __metadata("design:type", site_entity_1.Site)
], Vehicule.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => depense_entity_1.Depense, (depense) => depense.vehicules, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'depenseId' }),
    __metadata("design:type", depense_entity_1.Depense)
], Vehicule.prototype, "depense", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vehicule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Vehicule.prototype, "updatedAt", void 0);
exports.Vehicule = Vehicule = __decorate([
    (0, typeorm_1.Entity)('vehicules')
], Vehicule);
//# sourceMappingURL=vehicule.entity.js.map