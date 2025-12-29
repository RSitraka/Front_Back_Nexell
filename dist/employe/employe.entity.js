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
exports.Employe = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../site/site.entity");
const depense_entity_1 = require("../depense/depense.entity");
const user_entity_1 = require("../user/user.entity");
let Employe = class Employe {
    id;
    nom;
    prenom;
    adresse;
    numeroTelephone;
    nationalite;
    scanPhotoCIN;
    scanCertificat;
    salaire;
    avanceCumulee;
    resteSalaire;
    user;
    site;
    depenses;
    createdAt;
    updatedAt;
};
exports.Employe = Employe;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Employe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employe.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employe.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employe.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employe.prototype, "numeroTelephone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employe.prototype, "nationalite", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employe.prototype, "scanPhotoCIN", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employe.prototype, "scanCertificat", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Employe.prototype, "salaire", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Employe.prototype, "avanceCumulee", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Employe.prototype, "resteSalaire", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.employe),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Employe.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.employes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'siteId' }),
    __metadata("design:type", site_entity_1.Site)
], Employe.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => depense_entity_1.Depense, (depense) => depense.employe),
    __metadata("design:type", Array)
], Employe.prototype, "depenses", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Employe.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Employe.prototype, "updatedAt", void 0);
exports.Employe = Employe = __decorate([
    (0, typeorm_1.Entity)('employes')
], Employe);
//# sourceMappingURL=employe.entity.js.map