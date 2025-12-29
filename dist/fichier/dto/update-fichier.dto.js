"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFichierDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fichier_dto_1 = require("./create-fichier.dto");
class UpdateFichierDto extends (0, mapped_types_1.PartialType)(create_fichier_dto_1.CreateFichierDto) {
}
exports.UpdateFichierDto = UpdateFichierDto;
//# sourceMappingURL=update-fichier.dto.js.map