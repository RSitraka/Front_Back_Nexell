"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const databaseConfig = (configService) => {
    const password = configService.get('DB_PASSWORD');
    console.log('DB_PASSWORD:', password, '| Type:', typeof password);
    return {
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: password,
        database: configService.get('DB_DATABASE', 'Master2_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        autoLoadEntities: true,
    };
};
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map