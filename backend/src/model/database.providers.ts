import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      console.log(configService.get<string>('DB_HOST'));

      const dataSource = new DataSource({
        // 自动检测docker环境变量 如果是测试环境，默认导入本地开发环境配置文件配置项的值
        type: 'mysql',
        host: process.env.DB_HOST || configService.get<string>('DB_HOST'),
        port:
          Number(process.env.DB_PORT) || configService.get<number>('DB_PORT'),
        username: process.env.DB_USER || configService.get<string>('DB_USER'),
        password:
          process.env.DB_PASSWORD || configService.get<string>('DB_PASS'),
        database:
          process.env.DB_DATABASE || configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false, // ❌ 关闭自动同步
        migrationsRun: true, // ✅ 启用迁移
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
