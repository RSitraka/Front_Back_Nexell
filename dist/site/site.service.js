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
exports.SiteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const site_entity_1 = require("./site.entity");
let SiteService = class SiteService {
    siteRepository;
    constructor(siteRepository) {
        this.siteRepository = siteRepository;
    }
    async create(createSiteDto) {
        const site = this.siteRepository.create(createSiteDto);
        return await this.siteRepository.save(site);
    }
    async findAll() {
        return await this.siteRepository.find({
            relations: ['employes', 'materiels', 'vehicules', 'depenses'],
        });
    }
    async findOne(id) {
        const site = await this.siteRepository.findOne({
            where: { id },
            relations: [
                'employes',
                'materiels',
                'vehicules',
                'depenses',
                'photos',
                'fichiers',
            ],
        });
        if (!site) {
            throw new common_1.NotFoundException(`Site avec l'ID ${id} non trouvé`);
        }
        return site;
    }
    async getTotalDepenses(id) {
        const site = await this.findOne(id);
        const total = site.depenses.reduce((sum, depense) => sum + Number(depense.montant), 0);
        const parType = site.depenses.reduce((acc, depense) => {
            if (!acc[depense.type]) {
                acc[depense.type] = 0;
            }
            acc[depense.type] += Number(depense.montant);
            return acc;
        }, {});
        return { total, parType };
    }
    async update(id, updateSiteDto) {
        const site = await this.findOne(id);
        Object.assign(site, updateSiteDto);
        return await this.siteRepository.save(site);
    }
    async remove(id) {
        const result = await this.siteRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Site avec l'ID ${id} non trouvé`);
        }
    }
};
exports.SiteService = SiteService;
exports.SiteService = SiteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SiteService);
//# sourceMappingURL=site.service.js.map