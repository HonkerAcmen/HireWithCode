"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const HttpExceptionFilter_1 = require("./HttpException/HttpExceptionFilter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const corsOrigin = configService.get('CORS_ORIGIN');
    let isEnable = false;
    if (corsOrigin === '*' || corsOrigin === 'true')
        isEnable = true;
    app.enableCors({
        origin: isEnable,
        exposedHeaders: ['X-Captcha-Token'],
        methods: 'GET,POST,DELETE',
        allowedHeaders: 'Content-Type,X-Captcha-Token,Authorization',
    });
    app.useGlobalFilters(new HttpExceptionFilter_1.HttpExceptionFilter());
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map