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
exports.DemandeMaterielService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const demande_materiel_entity_1 = require("./demande-materiel.entity");
const materiel_entity_1 = require("../materiel/materiel.entity");
const site_entity_1 = require("../site/site.entity");
const depense_service_1 = require("../depense/depense.service");
let DemandeMaterielService = class DemandeMaterielService {
    demandeRepo;
    materielRepo;
    siteRepo;
    depenseService;
    constructor(demandeRepo, materielRepo, siteRepo, depenseService) {
        this.demandeRepo = demandeRepo;
        this.materielRepo = materielRepo;
        this.siteRepo = siteRepo;
        this.depenseService = depenseService;
    }
    async create(dto, user) {
        const materiel = await this.materielRepo.findOne({
            where: { id: dto.materielId },
        });
        const site = await this.siteRepo.findOne({
            where: { id: dto.siteId },
        });
        if (!materiel) {
            throw new common_1.NotFoundException(`Matériel ${dto.materielId} non trouvé`);
        }
        if (!site) {
            throw new common_1.NotFoundException(`Site ${dto.siteId} non trouvé`);
        }
        const demande = this.demandeRepo.create({
            materiel,
            site,
            quantite: dto.quantite,
            motif: dto.motif,
            justificatifUrl: dto.justificatifUrl,
            demandeur: user,
            statut: demande_materiel_entity_1.StatutDemande.EN_ATTENTE,
        });
        return await this.demandeRepo.save(demande);
    }
    async findAll(siteId) {
        const where = {};
        if (siteId)
            where.site = { id: siteId };
        return await this.demandeRepo.find({
            where,
            relations: ['demandeur', 'materiel', 'site'],
        });
    }
    async findOne(id) {
        const demande = await this.demandeRepo.findOne({
            where: { id },
            relations: ['demandeur', 'materiel', 'site'],
        });
        if (!demande) {
            throw new common_1.NotFoundException(`Demande ${id} non trouvée`);
        }
        return demande;
    }
    async update(id, dto) {
        const demande = await this.findOne(id);
        Object.assign(demande, dto);
        return await this.demandeRepo.save(demande);
    }
    async valider(id) {
        const demande = await this.findOne(id);
        if (demande.statut !== demande_materiel_entity_1.StatutDemande.EN_ATTENTE) {
            throw new common_1.BadRequestException('Seules les demandes en attente peuvent être validées');
        }
        demande.statut = demande_materiel_entity_1.StatutDemande.VALIDEE;
        await this.depenseService.createDepenseFromDemande(demande);
        return await this.demandeRepo.save(demande);
    }
    async rejeter(id) {
        const demande = await this.findOne(id);
        demande.statut = demande_materiel_entity_1.StatutDemande.REJETEE;
        return await this.demandeRepo.save(demande);
    }
};
exports.DemandeMaterielService = DemandeMaterielService;
exports.DemandeMaterielService = DemandeMaterielService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(demande_materiel_entity_1.DemandeMateriel)),
    __param(1, (0, typeorm_1.InjectRepository)(materiel_entity_1.Materiel)),
    __param(2, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        depense_service_1.DepenseService])
], DemandeMaterielService);
//# sourceMappingURL=demande-materiel.service.js.map