import { CreateEmployeDto } from './create-employe.dto';
declare const UpdateEmployeDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateEmployeDto, "siteId">>>;
export declare class UpdateEmployeDto extends UpdateEmployeDto_base {
}
export {};
