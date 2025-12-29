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
exports.Site = exports.StatutSite = exports.TypeTravail = void 0;
const typeorm_1 = require("typeorm");
const employe_entity_1 = require("../employe/employe.entity");
const materiel_entity_1 = require("../materiel/materiel.entity");
const vehicule_entity_1 = require("../vehicule/vehicule.entity");
const depense_entity_1 = require("../depense/depense.entity");
const photo_entity_1 = require("../photo/photo.entity");
const fichier_entity_1 = require("../fichier/fichier.entity");
const user_entity_1 = require("../user/user.entity");
const demande_materiel_entity_1 = require("../demande-materiel/demande-materiel.entity");
const demande_achat_entity_1 = require("../demande-achat/demande-achat.entity");
const demande_avance_entity_1 = require("../demande-avance/demande-avance.entity");
const demande_budget_entity_1 = require("../demande-budget/demande-budget.entity");
var TypeTravail;
(function (TypeTravail) {
    TypeTravail["CALIBRAGE"] = "Calibrage";
    TypeTravail["INSTALLATION"] = "Installation";
    TypeTravail["MAINTENANCE"] = "Maintenance";
})(TypeTravail || (exports.TypeTravail = TypeTravail = {}));
var StatutSite;
(function (StatutSite) {
    StatutSite["EN_COURS"] = "En cours";
    StatutSite["TERMINE"] = "Termin\u00E9";
    StatutSite["SUSPENDU"] = "Suspendu";
})(StatutSite || (exports.StatutSite = StatutSite = {}));
let Site = class Site {
    id;
    typeTravail;
    localisation;
    coordonneesGPS;
    description;
    statut;
    employes;
    demandesAvance;
    materiels;
    vehicules;
    depenses;
    demandesAchat;
    demandesBudget;
    photos;
    fichiers;
    demandesMateriel;
    users;
    createdAt;
    updatedAt;
    static siteId;
};
exports.Site = Site;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Site.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TypeTravail,
    }),
    __metadata("design:type", String)
], Site.prototype, "typeTravail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Site.prototype, "localisation", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Site.prototype, "coordonneesGPS", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Site.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StatutSite,
        default: StatutSite.EN_COURS,
    }),
    __metadata("design:type", String)
], Site.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employe_entity_1.Employe, (employe) => employe.site),
    __metadata("design:type", Array)
], Site.prototype, "employes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demande_avance_entity_1.DemandeAvance, (demande) => demande.site, { nullable: true }),
    __metadata("design:type", Array)
], Site.prototype, "demandesAvance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => materiel_entity_1.Materiel, (materiel) => materiel.site),
    __metadata("design:type", Array)
], Site.prototype, "materiels", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicule_entity_1.Vehicule, (vehicule) => vehicule.site),
    __metadata("design:type", Array)
], Site.prototype, "vehicules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => depense_entity_1.Depense, (depense) => depense.site),
    __metadata("design:type", Array)
], Site.prototype, "depenses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demande_achat_entity_1.DemandeAchat, (demande) => demande.site),
    __metadata("design:type", Array)
], Site.prototype, "demandesAchat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demande_budget_entity_1.DemandeBudget, (demande) => demande.site),
    __metadata("design:type", Array)
], Site.prototype, "demandesBudget", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => photo_entity_1.Photo, (photo) => photo.site),
    __metadata("design:type", Array)
], Site.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fichier_entity_1.Fichier, (fichier) => fichier.site),
    __metadata("design:type", Array)
], Site.prototype, "fichiers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demande_materiel_entity_1.DemandeMateriel, (demande) => demande.site),
    __metadata("design:type", Array)
], Site.prototype, "demandesMateriel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.site),
    __metadata("design:type", Array)
], Site.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Site.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Site.prototype, "updatedAt", void 0);
exports.Site = Site = __decorate([
    (0, typeorm_1.Entity)('sites')
], Site);
//# sourceMappingURL=site.entity.js.map