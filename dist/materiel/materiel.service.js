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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterielService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const materiel_entity_1 = require("./materiel.entity");
const depense_service_1 = require("../depense/depense.service");
const fichier_service_1 = require("../fichier/fichier.service");
const depense_entity_1 = require("../depense/depense.entity");
let MaterielService = class MaterielService {
    materielRepository;
    depenseService;
    fichierService;
    constructor(materielRepository, depenseService, fichierService) {
        this.materielRepository = materielRepository;
        this.depenseService = depenseService;
        this.fichierService = fichierService;
    }
    async create(createMaterielDto) {
        const { siteId, prix, nom, modele, nomFournisseur } = createMaterielDto;
        if (!siteId) {
            throw new common_1.BadRequestException('siteId is required');
        }
        const materiel = this.materielRepository.create(createMaterielDto);
        const savedMateriel = await this.materielRepository.save(materiel);
        await this.depenseService.create({
            montant: prix,
            description: `Achat matériel : ${nom} ${modele} (Fournisseur: ${nomFournisseur})`,
            type: depense_entity_1.TypeDepense.ACHAT_MATERIEL,
            siteId,
            materielId: savedMateriel.id,
        });
        return savedMateriel;
    }
    async findAll() {
        return await this.materielRepository.find({
            relations: ['site'],
        });
    }
    async findOne(id) {
        const materiel = await this.materielRepository.findOne({
            where: { id },
            relations: ['site'],
        });
        if (!materiel) {
            throw new common_1.NotFoundException(`Matériel avec l'ID ${id} non trouvé`);
        }
        return materiel;
    }
    async findBySite(siteId) {
        return await this.materielRepository.find({
            where: { site: { id: siteId } },
            relations: ['site'],
        });
    }
    async update(id, updateMaterielDto) {
        const materiel = await this.findOne(id);
        Object.assign(materiel, updateMaterielDto);
        return await this.materielRepository.save(materiel);
    }
    async remove(id) {
        const result = await this.materielRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Matériel avec l'ID ${id} non trouvé`);
        }
    }
    async assignFacture(materielId, fichierId) {
        const materiel = await this.findOne(materielId);
        const fichier = await this.fichierService.findOne(fichierId);
        if (fichier.site.id !== materiel.site?.id) {
            throw new common_1.BadRequestException('Le fichier et le matériel doivent appartenir au même site');
        }
    }
};
exports.MaterielService = MaterielService;
exports.MaterielService = MaterielService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(materiel_entity_1.Materiel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        depense_service_1.DepenseService,
        fichier_service_1.FichierService])
], MaterielService);
//# sourceMappingURL=materiel.service.js.map