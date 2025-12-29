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
exports.DemandeAchatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const demande_achat_entity_1 = require("./demande-achat.entity");
const site_entity_1 = require("../site/site.entity");
const depense_service_1 = require("../depense/depense.service");
const depense_entity_1 = require("../depense/depense.entity");
const demande_budget_service_1 = require("../demande-budget/demande-budget.service");
const materiel_entity_1 = require("../materiel/materiel.entity");
let DemandeAchatService = class DemandeAchatService {
    repo;
    siteRepo;
    materielRepo;
    depenseService;
    demandeBudgetService;
    constructor(repo, siteRepo, materielRepo, depenseService, demandeBudgetService) {
        this.repo = repo;
        this.siteRepo = siteRepo;
        this.materielRepo = materielRepo;
        this.depenseService = depenseService;
        this.demandeBudgetService = demandeBudgetService;
    }
    async create(dto, user) {
        const site = await this.siteRepo.findOne({ where: { id: dto.siteId } });
        if (!site)
            throw new common_1.NotFoundException(`Site ${dto.siteId} non trouvé`);
        const demande = this.repo.create({
            ...dto,
            demandeur: user,
            site,
            statut: demande_achat_entity_1.StatutDemandeAchat.EN_ATTENTE,
        });
        const created = await this.repo.save(demande);
        await this.demandeBudgetService.create({
            motif: `Demande d'achat pour ${created.nom}`,
            montant: created.prixEstime,
            siteId: created.site.id,
            demandeurId: created.demandeur.id,
        });
        return created;
    }
    async valider(id, valideur) {
        const demande = await this.findOne(id);
        if (demande.statut !== demande_achat_entity_1.StatutDemandeAchat.EN_ATTENTE) {
            throw new common_1.BadRequestException('Cette demande n’est pas en attente.');
        }
        demande.statut = demande_achat_entity_1.StatutDemandeAchat.VALIDEE;
        let materiel = await this.materielRepo.findOne({
            where: { nom: demande.nom, modele: demande.modele },
        });
        if (!materiel) {
            materiel = this.materielRepo.create({
                nom: demande.nom,
                modele: demande.modele,
                prix: demande.prixEstime,
                nomFournisseur: demande.fournisseur || 'Inconnu',
                site: demande.site,
            });
            materiel = await this.materielRepo.save(materiel);
        }
        await this.depenseService.create({
            type: depense_entity_1.TypeDepense.ACHAT_MATERIEL,
            montant: demande.prixEstime,
            description: `Déblocage budget achat : ${demande.nom} ${demande.modele || ''}`,
            siteId: demande.site.id,
            demandeurId: demande.demandeur.id,
            userId: valideur.id,
            materielId: materiel.id,
        });
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
    async rejeter(id) {
        const demande = await this.findOne(id);
        demande.statut = demande_achat_entity_1.StatutDemandeAchat.REJETEE;
        return await this.repo.save(demande);
    }
};
exports.DemandeAchatService = DemandeAchatService;
exports.DemandeAchatService = DemandeAchatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(demande_achat_entity_1.DemandeAchat)),
    __param(1, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __param(2, (0, typeorm_1.InjectRepository)(materiel_entity_1.Materiel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        depense_service_1.DepenseService,
        demande_budget_service_1.DemandeBudgetService])
], DemandeAchatService);
//# sourceMappingURL=demande-achat.service.js.map