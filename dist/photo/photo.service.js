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
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const photo_entity_1 = require("./photo.entity");
let PhotoService = class PhotoService {
    PhotoRepository;
    constructor(PhotoRepository) {
        this.PhotoRepository = PhotoRepository;
    }
    async create(createPhotoDto) {
        const Photo = this.PhotoRepository.create(createPhotoDto);
        return await this.PhotoRepository.save(Photo);
    }
    async findAll() {
        return await this.PhotoRepository.find({
            relations: ['site', 'depenses'],
        });
    }
    async findOne(id) {
        const Photo = await this.PhotoRepository.findOne({
            where: { id },
            relations: ['site', 'depenses'],
        });
        if (!Photo) {
            throw new common_1.NotFoundException(`Employé avec l'ID ${id} non trouvé`);
        }
        return Photo;
    }
    async findBySite(siteId) {
        return await this.PhotoRepository.find({
            where: { site: { id: siteId } },
            relations: ['depenses'],
        });
    }
    async remove(id) {
        const result = await this.PhotoRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Employé avec l'ID ${id} non trouvé`);
        }
    }
};
exports.PhotoService = PhotoService;
exports.PhotoService = PhotoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhotoService);
//# sourceMappingURL=photo.service.js.map