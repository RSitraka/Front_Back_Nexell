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
exports.Depense = exports.PeriodeDepense = exports.TypeDepense = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../site/site.entity");
const user_entity_1 = require("../user/user.entity");
const employe_entity_1 = require("../employe/employe.entity");
const materiel_entity_1 = require("../materiel/materiel.entity");
const vehicule_entity_1 = require("../vehicule/vehicule.entity");
var TypeDepense;
(function (TypeDepense) {
    TypeDepense["LOCATION_CARBURANT"] = "Location + carburant de voiture";
    TypeDepense["ACHAT_MATERIEL"] = "achat_materiel";
    TypeDepense["MATERIEL"] = "Prix de mat\u00E9riels";
    TypeDepense["SALAIRE"] = "Salaire employ\u00E9 (avec avance)";
    TypeDepense["DELOCBUDGET_ACHAT"] = "Deblocage budget achat";
    TypeDepense["AUTRE"] = "Autre";
})(TypeDepense || (exports.TypeDepense = TypeDepense = {}));
var PeriodeDepense;
(function (PeriodeDepense) {
    PeriodeDepense["SEMAINE"] = "semaine";
    PeriodeDepense["MOIS"] = "mois";
})(PeriodeDepense || (exports.PeriodeDepense = PeriodeDepense = {}));
let Depense = class Depense {
    id;
    type;
    montant;
    description;
    periode;
    materiel;
    site;
    user;
    demandeur;
    employe;
    vehicules;
    createdAt;
    updatedAt;
};
exports.Depense = Depense;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Depense.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        enum: TypeDepense,
        default: TypeDepense.AUTRE,
    }),
    __metadata("design:type", String)
], Depense.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Depense.prototype, "montant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Depense.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        enum: PeriodeDepense,
        nullable: true,
    }),
    __metadata("design:type", String)
], Depense.prototype, "periode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => materiel_entity_1.Materiel, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'materielId' }),
    __metadata("design:type", materiel_entity_1.Materiel)
], Depense.prototype, "materiel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'siteId' }),
    __metadata("design:type", site_entity_1.Site)
], Depense.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Depense.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'demandeurId' }),
    __metadata("design:type", user_entity_1.User)
], Depense.prototype, "demandeur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employe_entity_1.Employe, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'employeId' }),
    __metadata("design:type", employe_entity_1.Employe)
], Depense.prototype, "employe", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicule_entity_1.Vehicule, (vehicule) => vehicule.depense),
    __metadata("design:type", Array)
], Depense.prototype, "vehicules", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Depense.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Depense.prototype, "updatedAt", void 0);
exports.Depense = Depense = __decorate([
    (0, typeorm_1.Entity)('depenses')
], Depense);
//# sourceMappingURL=depense.entity.js.map