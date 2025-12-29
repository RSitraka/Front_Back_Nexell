"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMaterielDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_materiel_dto_1 = require("./create-materiel.dto");
class UpdateMaterielDto extends (0, mapped_types_1.PartialType)(create_materiel_dto_1.CreateMaterielDto) {
}
exports.UpdateMaterielDto = UpdateMaterielDto;
//# sourceMappingURL=update-materiel.dto.js.map