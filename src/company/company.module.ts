import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceController } from 'src/places/controllers/place.controller';
import { PlaceEntity } from 'src/places/entitites/place.entity';
import { PlaceService } from 'src/places/services/place.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { CompanyController } from './controllers/company.controller';
import { CompanyEntity } from './entitites/company.entity';
import { CompanyService } from './services/company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    TypeOrmModule.forFeature([PlaceEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [CompanyController, PlaceController],
  providers: [CompanyService, PlaceService, UserService],
})
export class CompanyModule {}
