import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './HttpException/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 获取配置项
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('CORS_ORIGIN');

  // 设置CORS项
  let isEnable = false;
  if (corsOrigin === '*' || corsOrigin === 'true') isEnable = true;

  app.enableCors({
    origin: isEnable,
    exposedHeaders: ['X-Captcha-Token'],
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type,X-Captcha-Token,Authorization',
  });

  // 导入全局异常处理
  app.useGlobalFilters(new HttpExceptionFilter());

  // 设置路由前缀
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
