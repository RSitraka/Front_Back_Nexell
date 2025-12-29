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
exports.VehiculeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicule_entity_1 = require("./vehicule.entity");
let VehiculeService = class VehiculeService {
    VehiculeRepository;
    constructor(VehiculeRepository) {
        this.VehiculeRepository = VehiculeRepository;
    }
    async create(createVehiculeDto) {
        const Vehicule = this.VehiculeRepository.create(createVehiculeDto);
        return await this.VehiculeRepository.save(Vehicule);
    }
    async findAll() {
        return await this.VehiculeRepository.find({
            relations: ['site', 'depenses'],
        });
    }
    async findOne(id) {
        const Vehicule = await this.VehiculeRepository.findOne({
            where: { id },
            relations: ['site', 'depenses'],
        });
        if (!Vehicule) {
            throw new common_1.NotFoundException(`Employé avec l'ID ${id} non trouvé`);
        }
        return Vehicule;
    }
    async findBySite(siteId) {
        return await this.VehiculeRepository.find({
            where: { site: { id: siteId } },
            relations: ['depenses'],
        });
    }
    async remove(id) {
        const result = await this.VehiculeRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Employé avec l'ID ${id} non trouvé`);
        }
    }
};
exports.VehiculeService = VehiculeService;
exports.VehiculeService = VehiculeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicule_entity_1.Vehicule)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VehiculeService);
//# sourceMappingURL=vehicule.service.js.map