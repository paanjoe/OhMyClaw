import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;
  const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

  app.use(cookieParser());
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}
bootstrap();
