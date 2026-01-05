"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const databaseConfig = (configService) => {
    const password = configService.get('DB_PASSWORD');
    console.log('DB_PASSWORD:', password, '| Type:', typeof password);
    return {
        type: 'sqlite',
        database: 'data.sqlite',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: configService.get('NODE_ENV') === 'development',
        autoLoadEntities: true,
    };
};
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map