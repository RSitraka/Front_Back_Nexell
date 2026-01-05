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
exports.Fichier = exports.TypeFichier = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../site/site.entity");
var TypeFichier;
(function (TypeFichier) {
    TypeFichier["SCAN_FACTURE"] = "Scan de facture";
    TypeFichier["DOCUMENT"] = "Document";
    TypeFichier["AUTRE"] = "Autre";
})(TypeFichier || (exports.TypeFichier = TypeFichier = {}));
let Fichier = class Fichier {
    id;
    url;
    type;
    description;
    site;
    uploadedAt;
};
exports.Fichier = Fichier;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Fichier.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fichier.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        enum: TypeFichier,
    }),
    __metadata("design:type", String)
], Fichier.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Fichier.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_entity_1.Site, (site) => site.fichiers),
    __metadata("design:type", site_entity_1.Site)
], Fichier.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Fichier.prototype, "uploadedAt", void 0);
exports.Fichier = Fichier = __decorate([
    (0, typeorm_1.Entity)('Fichier')
], Fichier);
//# sourceMappingURL=fichier.entity.js.map