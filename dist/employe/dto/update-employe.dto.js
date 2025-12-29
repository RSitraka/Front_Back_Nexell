"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_employe_dto_1 = require("./create-employe.dto");
class UpdateEmployeDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_employe_dto_1.CreateEmployeDto, ['siteId'])) {
}
exports.UpdateEmployeDto = UpdateEmployeDto;
//# sourceMappingURL=update-employe.dto.js.map