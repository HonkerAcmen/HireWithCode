"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (configService) => {
            console.log(configService.get('DB_HOST'));
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: process.env.DB_HOST || configService.get('DB_HOST'),
                port: Number(process.env.DB_PORT) || configService.get('DB_PORT'),
                username: process.env.DB_USER || configService.get('DB_USER'),
                password: process.env.DB_PASSWORD || configService.get('DB_PASS'),
                database: process.env.DB_DATABASE || configService.get('DB_NAME'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: false,
                migrationsRun: true,
            });
            return dataSource.initialize();
        },
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=database.providers.js.map