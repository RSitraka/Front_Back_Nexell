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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../site/site.entity");
const depense_entity_1 = require("../depense/depense.entity");
const user_role_enum_1 = require("./enums/user-role.enum");
const employe_entity_1 = require("../employe/employe.entity");
const demande_materiel_entity_1 = require("../demande-materiel/demande-materiel.entity");
const demande_achat_entity_1 = require("../demande-achat/demande-achat.entity");
const demande_avance_entity_1 = require("../demande-avance/demande-avance.entity");
const demande_budget_entity_1 = require("../demande-budget/demande-budget.entity");
let User = class User {
    id;
    email;
    password;
    nom;
    prenom;
    role;
    isActive;
    employe;
    site;
    depensesValidees;
    depensesCreees;
    demandesAchat;
    demandesAvance;
    demandesMateriel;
    demandesBudget;
    createdAt;
    updatedAt;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_role_enum_1.UserRole,
        default: user_role_enum_1.UserRole.EMPLOYE,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => employe_entity_1.Employe, (employe) => employe.user, {
        nullable: true,
        cascade: true,
    }),
    __metadata("design:type", employe_entity_1.Employe)
], User.prototype, "employe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.users, { nullable: true }),
    __metadata("design:type", site_entity_1.Site)
], User.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => depense_entity_1.Depense, (depense) => depense.user),
    __metadata("design:type", Array)
], User.prototype, "depensesValidees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => depense_entity_1.Depense, (depense) => depense.demandeur),
    __metadata("design:type", Array)
], User.prototype, "depensesCreees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demande_achat_entity_1.DemandeAchat, (demande) => demande.demandeur),
    __metadata("design:type", Array)
], User.prototype, "demandesAchat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demande_avance_entity_1.DemandeAvance, (demande) => demande.demandeur),
    __metadata("design:type", Array)
], User.prototype, "demandesAvance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demande_materiel_entity_1.DemandeMateriel, (demande) => demande.demandeur),
    __metadata("design:type", Array)
], User.prototype, "demandesMateriel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demande_budget_entity_1.DemandeBudget, (demande) => demande.demandeur),
    __metadata("design:type", Array)
], User.prototype, "demandesBudget", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map