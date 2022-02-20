// Environment
import * as dotenv from 'dotenv';
import * as path from 'path';
const baseDir = path.join(__dirname, '../');
dotenv.config({ path: baseDir + `.env.${process.env.NODE_ENV}` });

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config({ path: `../.env.${process.env.NODE_ENV}.` });

  // Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('API HubLocal')
    .setDescription('The back-end API documentation')
    .setVersion('1.0')
    .addTag('app')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  // Validator
  app.useGlobalPipes(new ValidationPipe());

  const port = parseInt(process.env.PORT) || 3000;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/');
    Logger.log('Running in ' + process.env.NODE_ENV + ' mode');
  });
}
bootstrap();
