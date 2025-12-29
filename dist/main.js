"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const role_guard_1 = require("./common/guards/role.guard");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const app_module_1 = require("./app.module");
const core_2 = require("@nestjs/core");
const seed_admin_service_1 = require("./seed/seed-admin.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = app.get(core_2.Reflector);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector), new role_guard_1.RolesGuard(reflector));
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:4200'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const seedService = app.get(seed_admin_service_1.SeedAdminService);
    await seedService.seed();
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}/api`);
    console.log('JWT_SECRET chargé:', process.env.JWT_SECRET);
}
bootstrap();
//# sourceMappingURL=main.js.map