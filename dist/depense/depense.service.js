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
exports.DepenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const depense_entity_1 = require("./depense.entity");
const site_entity_1 = require("../site/site.entity");
const materiel_entity_1 = require("../materiel/materiel.entity");
const employe_entity_1 = require("../employe/employe.entity");
const user_entity_1 = require("../user/user.entity");
const vehicule_entity_1 = require("../vehicule/vehicule.entity");
let DepenseService = class DepenseService {
    depenseRepository;
    siteRepo;
    userRepo;
    employeRepo;
    materielRepo;
    vehiculeRepo;
    constructor(depenseRepository, siteRepo, userRepo, employeRepo, materielRepo, vehiculeRepo) {
        this.depenseRepository = depenseRepository;
        this.siteRepo = siteRepo;
        this.userRepo = userRepo;
        this.employeRepo = employeRepo;
        this.materielRepo = materielRepo;
        this.vehiculeRepo = vehiculeRepo;
    }
    async create(dto) {
        const depense = new depense_entity_1.Depense();
        depense.type = dto.type;
        depense.montant = dto.montant;
        depense.description = dto.description ?? null;
        if (dto.siteId) {
            const site = await this.siteRepo.findOne({ where: { id: dto.siteId } });
            if (!site)
                throw new common_1.NotFoundException(`Site ${dto.siteId} non trouvé`);
            depense.site = site;
        }
        if (dto.userId) {
            const user = await this.userRepo.findOne({ where: { id: dto.userId } });
            if (!user)
                throw new common_1.NotFoundException(`User ${dto.userId} non trouvé`);
            depense.user = user;
        }
        if (dto.demandeurId) {
            const demandeur = await this.userRepo.findOne({
                where: { id: dto.demandeurId },
            });
            if (!demandeur)
                throw new common_1.NotFoundException(`Demandeur ${dto.demandeurId} non trouvé`);
            depense.demandeur = demandeur;
        }
        if (dto.materielId) {
            const materiel = await this.materielRepo.findOne({
                where: { id: dto.materielId },
            });
            if (!materiel)
                throw new common_1.NotFoundException(`Matériel ${dto.materielId} non trouvé`);
            depense.materiel = materiel;
        }
        if (dto.vehiculeId) {
            const vehicule = await this.vehiculeRepo.findOne({
                where: { id: dto.vehiculeId },
            });
            if (!vehicule) {
                throw new common_1.NotFoundException(`Véhicule ${dto.vehiculeId} non trouvé`);
            }
        }
        return await this.depenseRepository.save(depense);
    }
    async createDepenseFromDemande(demandeMateriel) {
        if (!demandeMateriel.materiel || !demandeMateriel.quantite) {
            throw new common_1.NotFoundException('Matériel ou quantité non trouvée');
        }
        const montant = demandeMateriel.materiel.prix * demandeMateriel.quantite;
        const depense = this.depenseRepository.create({
            montant: montant,
            description: `Dépense pour le matériel : ${demandeMateriel.materiel.nom}`,
            site: demandeMateriel.site,
            materiel: demandeMateriel.materiel,
            type: depense_entity_1.TypeDepense.MATERIEL,
        });
        return await this.depenseRepository.save(depense);
    }
    async findAll() {
        return await this.depenseRepository.find({
            relations: ['site', 'materiel', 'employe', 'user'],
        });
    }
    async findOne(id) {
        const depense = await this.depenseRepository.findOne({
            where: { id },
            relations: ['site', 'materiel', 'employe', 'user'],
        });
        if (!depense) {
            throw new common_1.NotFoundException(`Dépense avec l'ID ${id} non trouvée`);
        }
        return depense;
    }
    async findBySite(siteId) {
        return await this.depenseRepository.find({
            where: { site: { id: siteId } },
            relations: ['site', 'materiel', 'employe', 'user'],
        });
    }
    async getMateriel(depenseId) {
        const depense = await this.findOne(depenseId);
        if (!depense.materiel) {
            throw new common_1.NotFoundException('Aucun matériel lié à cette dépense');
        }
        return depense.materiel;
    }
    async remove(id) {
        const result = await this.depenseRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Dépense avec l'ID ${id} non trouvée`);
        }
    }
};
exports.DepenseService = DepenseService;
exports.DepenseService = DepenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(depense_entity_1.Depense)),
    __param(1, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(employe_entity_1.Employe)),
    __param(4, (0, typeorm_1.InjectRepository)(materiel_entity_1.Materiel)),
    __param(5, (0, typeorm_1.InjectRepository)(vehicule_entity_1.Vehicule)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DepenseService);
//# sourceMappingURL=depense.service.js.map