import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceController } from 'src/places/controllers/place.controller';
import { PlaceEntity } from 'src/places/entitites/place.entity';
import { PlaceModule } from 'src/places/place.module';
import { PlaceService } from 'src/places/services/place.service';
import { CompanyController } from './controllers/company.controller';
import { CompanyEntity } from './entitites/company.entity';
import { CompanyService } from './services/company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    PlaceModule,
    TypeOrmModule.forFeature([PlaceEntity]),
  ],
  controllers: [CompanyController, PlaceController],
  providers: [CompanyService, PlaceService],
})
export class CompanyModule {}
