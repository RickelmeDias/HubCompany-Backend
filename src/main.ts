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
    .setTitle('API Hub Companies')
    .setDescription('The back-end API documentation')
    .setVersion('1.0.0')
    .addTag('API Hub Companies Documentation')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'acess-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  // Validator
  app.useGlobalPipes(new ValidationPipe());

  // Cors
  const whitelist = [
    'hubcompany.rickelmedias.dev',
    'rickelmedias.dev',
    'http://hubcompany.rickelmedias.dev',
    'https://hubcompany.rickelmedias.dev',
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  const port = parseInt(process.env.PORT) || 3000;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/');
    Logger.log('Running in ' + process.env.NODE_ENV + ' mode');
  });
}
bootstrap();
