"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employe_entity_1 = require("./employe.entity");
const user_entity_1 = require("../user/user.entity");
const site_entity_1 = require("../site/site.entity");
const bcrypt = __importStar(require("bcrypt"));
const user_role_enum_1 = require("../user/enums/user-role.enum");
let EmployeService = class EmployeService {
    employeRepository;
    userRepository;
    siteRepository;
    constructor(employeRepository, userRepository, siteRepository) {
        this.employeRepository = employeRepository;
        this.userRepository = userRepository;
        this.siteRepository = siteRepository;
    }
    async create(dto) {
        const exists = await this.userRepository.findOne({
            where: { email: dto.email },
        });
        if (exists)
            throw new common_1.BadRequestException('Email déjà utilisé');
        const site = dto.siteId
            ? await this.siteRepository.findOne({ where: { id: dto.siteId } })
            : null;
        if (dto.siteId && !site) {
            throw new common_1.NotFoundException(`Site ${dto.siteId} non trouvé`);
        }
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            email: dto.email,
            password: hashed,
            nom: dto.nom,
            prenom: dto.prenom,
            role: user_role_enum_1.UserRole.EMPLOYE,
            isActive: true,
            site: site ?? undefined,
        });
        const savedUser = await this.userRepository.save(user);
        const employe = this.employeRepository.create({
            nom: dto.nom,
            prenom: dto.prenom,
            adresse: dto.adresse,
            numeroTelephone: dto.numeroTelephone,
            nationalite: dto.nationalite,
            scanPhotoCIN: dto.scanPhotoCIN,
            scanCertificat: dto.scanCertificat,
            salaire: dto.salaire ?? 0,
            user: savedUser,
            site: site ?? undefined,
        });
        await this.employeRepository.save(employe);
        const userWithEmploye = await this.userRepository.findOne({
            where: { id: savedUser.id },
            relations: ['employe', 'site'],
        });
        if (!userWithEmploye) {
            throw new common_1.NotFoundException('Utilisateur créé mais introuvable');
        }
        return userWithEmploye;
    }
    async findAll() {
        return await this.employeRepository.find({
            relations: ['site'],
        });
    }
    async findOne(id) {
        const employe = await this.employeRepository.findOne({
            where: { id },
            relations: ['site', 'depenses'],
        });
        if (!employe)
            throw new common_1.NotFoundException(`Employé ${id} non trouvé`);
        return employe;
    }
    async findBySite(siteId) {
        return await this.employeRepository.find({
            where: { site: { id: siteId } },
            relations: ['site'],
        });
    }
    async update(id, dto) {
        const employe = await this.findOne(id);
        Object.assign(employe, dto);
        return await this.employeRepository.save(employe);
    }
    async remove(id) {
        const result = await this.employeRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Employé ${id} non trouvé`);
        }
    }
};
exports.EmployeService = EmployeService;
exports.EmployeService = EmployeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employe_entity_1.Employe)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeService);
//# sourceMappingURL=employe.service.js.map