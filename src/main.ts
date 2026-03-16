import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalInterceptors(new TransformInterceptor());

    // Swagger config
    const config = new DocumentBuilder()
        .setTitle('E-Commerce API')
        .setDescription('NestJS E-Commerce Backend API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);

    console.log('App running :)');
    console.log('Database connected successfully :D');
    console.log('Swagger docs: http://localhost:3000/api');

}

bootstrap();
