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
exports.DemandeBudgetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const demande_budget_entity_1 = require("./demande-budget.entity");
const depense_entity_1 = require("../depense/depense.entity");
const depense_entity_2 = require("../depense/depense.entity");
const depense_service_1 = require("../depense/depense.service");
let DemandeBudgetService = class DemandeBudgetService {
    demandeRepo;
    depenseService;
    constructor(demandeRepo, depenseService) {
        this.demandeRepo = demandeRepo;
        this.depenseService = depenseService;
    }
    async create(dto) {
        const demande = this.demandeRepo.create({
            motif: dto.motif,
            montant: dto.montant,
            site: { id: dto.siteId },
            demandeur: { id: dto.demandeurId },
        });
        return this.demandeRepo.save(demande);
    }
    async findAll() {
        return this.demandeRepo.find();
    }
    async findOne(id) {
        const demande = await this.demandeRepo.findOne({ where: { id } });
        if (!demande)
            throw new common_1.NotFoundException('Demande non trouvée');
        return demande;
    }
    async valider(id, dto, valideurId) {
        const demande = await this.demandeRepo.findOne({ where: { id } });
        if (!demande) {
            throw new common_1.NotFoundException('Demande non trouvée');
        }
        if (!dto.statut) {
            throw new common_1.BadRequestException('Le statut est obligatoire pour la validation');
        }
        demande.statut = dto.statut;
        demande.valideur = { id: valideurId };
        console.log('Statut de la demande:', dto.statut);
        console.log('ID du valideur:', valideurId);
        const updated = await this.demandeRepo.save(demande);
        if (updated.statut === demande_budget_entity_1.StatutDemande.APPROUVEE) {
            await this.depenseService.create({
                type: depense_entity_2.TypeDepense.ACHAT_MATERIEL,
                montant: updated.montant,
                description: `Budget débloqué pour ${updated.motif}`,
                siteId: updated.site.id,
                userId: valideurId,
            });
        }
        return updated;
    }
};
exports.DemandeBudgetService = DemandeBudgetService;
exports.DemandeBudgetService = DemandeBudgetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(demande_budget_entity_1.DemandeBudget)),
    __param(1, (0, typeorm_1.InjectRepository)(depense_entity_1.Depense)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        depense_service_1.DepenseService])
], DemandeBudgetService);
//# sourceMappingURL=demande-budget.service.js.map