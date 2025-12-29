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
exports.LivraisonService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const livraison_entity_1 = require("./livraison.entity");
const demande_achat_entity_1 = require("../demande-achat/demande-achat.entity");
const vehicule_entity_1 = require("../vehicule/vehicule.entity");
const user_entity_1 = require("../user/user.entity");
const site_entity_1 = require("../site/site.entity");
const depense_entity_1 = require("../depense/depense.entity");
let LivraisonService = class LivraisonService {
    repo;
    demandeAchatRepo;
    vehiculeRepo;
    userRepo;
    siteRepo;
    depenseRepo;
    constructor(repo, demandeAchatRepo, vehiculeRepo, userRepo, siteRepo, depenseRepo) {
        this.repo = repo;
        this.demandeAchatRepo = demandeAchatRepo;
        this.vehiculeRepo = vehiculeRepo;
        this.userRepo = userRepo;
        this.siteRepo = siteRepo;
        this.depenseRepo = depenseRepo;
    }
    calculerCoutLivraison(vehicule) {
        const coutCarburant = Number(vehicule.montantDepenseCarburant) || 0;
        const fraisFixe = 25000;
        return coutCarburant + fraisFixe;
    }
    async create(dto) {
        const demandeAchat = await this.demandeAchatRepo.findOne({
            where: { id: dto.demandeAchatId },
            relations: ['demandeur', 'site'],
        });
        if (!demandeAchat) {
            throw new common_1.NotFoundException(`DemandeAchat ${dto.demandeAchatId} introuvable`);
        }
        if (demandeAchat.statut !== 'VALIDEE') {
            throw new common_1.BadRequestException(`La demande d’achat doit être validée avant d’être livrée.`);
        }
        const vehicule = await this.vehiculeRepo.findOne({
            where: { id: dto.vehiculeId },
        });
        if (!vehicule) {
            throw new common_1.NotFoundException(`Véhicule ${dto.vehiculeId} introuvable`);
        }
        const site = await this.siteRepo.findOne({
            where: { id: dto.siteId },
        });
        if (!site) {
            throw new common_1.NotFoundException(`Site ${dto.siteId} introuvable`);
        }
        const livraison = this.repo.create({
            demandeAchat,
            vehicule,
            site,
            statut: dto.statut ?? livraison_entity_1.StatutLivraison.EN_ATTENTE,
            dateDepart: dto.dateDepart ? new Date(dto.dateDepart) : null,
            dateArrivee: null,
        });
        return await this.repo.save(livraison);
    }
    async valider(id, valideur) {
        const livraison = await this.repo.findOne({
            where: { id },
            relations: ['vehicule', 'demandeAchat', 'demandeAchat.demandeur', 'site'],
        });
        if (!livraison)
            throw new common_1.NotFoundException('Livraison introuvable');
        if (livraison.statut !== livraison_entity_1.StatutLivraison.EN_ATTENTE) {
            throw new common_1.BadRequestException('Seules les livraisons EN_ATTENTE peuvent être validées.');
        }
        livraison.statut = livraison_entity_1.StatutLivraison.EN_ROUTE;
        livraison.dateDepart = new Date();
        const cout = this.calculerCoutLivraison(livraison.vehicule);
        const depense = this.depenseRepo.create({
            type: depense_entity_1.TypeDepense.LOCATION_CARBURANT,
            montant: cout,
            description: `Livraison de ${livraison.demandeAchat.nom} via véhicule ${livraison.vehicule.numeroMatricule}`,
            site: livraison.site,
            user: valideur,
            demandeur: livraison.demandeAchat.demandeur,
        });
        await this.depenseRepo.save(depense);
        return await this.repo.save(livraison);
    }
    async update(id, dto) {
        const livraison = await this.repo.findOne({ where: { id } });
        if (!livraison)
            throw new common_1.NotFoundException('Livraison introuvable');
        if (dto.statut)
            livraison.statut = dto.statut;
        if (dto.dateArrivee)
            livraison.dateArrivee = new Date(dto.dateArrivee);
        return this.repo.save(livraison);
    }
    async findAll() {
        return this.repo.find({
            relations: ['vehicule', 'site', 'demandeAchat'],
        });
    }
    async findOne(id) {
        const livraison = await this.repo.findOne({
            where: { id },
            relations: ['vehicule', 'site', 'demandeAchat'],
        });
        if (!livraison)
            throw new common_1.NotFoundException('Livraison introuvable');
        return livraison;
    }
};
exports.LivraisonService = LivraisonService;
exports.LivraisonService = LivraisonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(livraison_entity_1.Livraison)),
    __param(1, (0, typeorm_1.InjectRepository)(demande_achat_entity_1.DemandeAchat)),
    __param(2, (0, typeorm_1.InjectRepository)(vehicule_entity_1.Vehicule)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __param(5, (0, typeorm_1.InjectRepository)(depense_entity_1.Depense)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LivraisonService);
//# sourceMappingURL=livraison.service.js.map