import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from "helmet";
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "https://software-app-frontend.onrender.com",
    ],
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
    })
  );

  const configService = app.get(ConfigService);

  const port = configService.get<number>("PORT") || 3000;

  await app.listen(port);
}

bootstrap();
