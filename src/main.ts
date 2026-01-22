import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false, // Allow extra fields from frontend
    transform: true,
    transformOptions: {
      enableImplicitConversion: true, // Auto-convert types
    },
  }));

  app.enableCors({
    origin: true, // Allow all origins in development
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
