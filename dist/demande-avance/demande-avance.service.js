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
exports.DemandeAvanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const demande_avance_entity_1 = require("./demande-avance.entity");
const site_entity_1 = require("../site/site.entity");
const depense_service_1 = require("../depense/depense.service");
const depense_entity_1 = require("../depense/depense.entity");
const employe_entity_1 = require("../employe/employe.entity");
let DemandeAvanceService = class DemandeAvanceService {
    repo;
    employeRepo;
    siteRepo;
    depenseService;
    constructor(repo, employeRepo, siteRepo, depenseService) {
        this.repo = repo;
        this.employeRepo = employeRepo;
        this.siteRepo = siteRepo;
        this.depenseService = depenseService;
    }
    async create(dto, user) {
        const site = dto.siteId
            ? await this.siteRepo.findOne({ where: { id: dto.siteId } })
            : null;
        if (dto.siteId && !site) {
            throw new common_1.NotFoundException(`Site ${dto.siteId} non trouvé`);
        }
        const demande = this.repo.create({
            montant: dto.montant,
            motif: dto.motif,
            statut: demande_avance_entity_1.StatutDemandeAvance.EN_ATTENTE,
        });
        demande.demandeur = user;
        if (site) {
            demande.site = site;
        }
        return await this.repo.save(demande);
    }
    async findAll(siteId) {
        const where = {};
        if (siteId)
            where.site = { id: siteId };
        return await this.repo.find({
            where,
            relations: ['demandeur', 'site'],
        });
    }
    async findOne(id) {
        const demande = await this.repo.findOne({
            where: { id },
            relations: ['demandeur', 'site'],
        });
        if (!demande)
            throw new common_1.NotFoundException(`Demande ${id} non trouvée`);
        return demande;
    }
    async update(id, dto) {
        const demande = await this.findOne(id);
        Object.assign(demande, dto);
        return await this.repo.save(demande);
    }
    async valider(id) {
        const demande = await this.repo.findOne({
            where: { id },
            relations: ['demandeur', 'demandeur.employe', 'demandeur.site', 'site'],
        });
        if (!demande) {
            throw new common_1.NotFoundException(`Demande ${id} non trouvée`);
        }
        if (demande.statut !== demande_avance_entity_1.StatutDemandeAvance.EN_ATTENTE) {
            throw new common_1.BadRequestException('Seules les demandes en attente peuvent être validées');
        }
        const employe = demande.demandeur.employe;
        if (!employe) {
            throw new common_1.BadRequestException("Aucun employé n'est lié à cet utilisateur.");
        }
        const salairePrestation = Number(employe.salaire);
        const avanceActuelle = Number(employe.avanceCumulee ?? 0);
        const demandeMontant = Number(demande.montant);
        const plafond = salairePrestation * 0.5;
        const totalAfterDemand = avanceActuelle + demandeMontant;
        if (totalAfterDemand > plafond) {
            throw new common_1.BadRequestException(`Avance refusée. Maximum autorisé : ${plafond}, avance cumulée actuelle : ${avanceActuelle}`);
        }
        employe.avanceCumulee = totalAfterDemand;
        employe.resteSalaire = salairePrestation - totalAfterDemand;
        await this.employeRepo.save(employe);
        const siteId = demande.site?.id ?? employe.site?.id;
        await this.depenseService.create({
            type: depense_entity_1.TypeDepense.SALAIRE,
            montant: demandeMontant,
            description: `Avance salaire : ${demande.motif}`,
            userId: demande.demandeur.id,
            siteId,
            employeId: employe.id,
        });
        demande.statut = demande_avance_entity_1.StatutDemandeAvance.VALIDEE;
        return await this.repo.save(demande);
    }
    async rejeter(id) {
        const demande = await this.findOne(id);
        demande.statut = demande_avance_entity_1.StatutDemandeAvance.REJETEE;
        return await this.repo.save(demande);
    }
};
exports.DemandeAvanceService = DemandeAvanceService;
exports.DemandeAvanceService = DemandeAvanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(demande_avance_entity_1.DemandeAvance)),
    __param(1, (0, typeorm_1.InjectRepository)(employe_entity_1.Employe)),
    __param(2, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        depense_service_1.DepenseService])
], DemandeAvanceService);
//# sourceMappingURL=demande-avance.service.js.map