import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/company/entitites/company.entity';
import { CompanyService } from 'src/company/services/company.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { PlaceController } from './controllers/place.controller';
import { PlaceEntity } from './entitites/place.entity';
import { PlaceService } from './services/place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceEntity]),
    TypeOrmModule.forFeature([CompanyEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, CompanyService, UserService],
})
export class PlaceModule {}
