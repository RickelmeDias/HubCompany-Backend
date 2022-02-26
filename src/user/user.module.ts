import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { PasscryptService } from './services/passcrypt.service';
import { CompanyEntity } from 'src/company/entitites/company.entity';
import { CompanyController } from 'src/company/controllers/company.controller';
import { CompanyService } from 'src/company/services/company.service';
import { PlaceController } from 'src/places/controllers/place.controller';
import { PlaceEntity } from 'src/places/entitites/place.entity';
import { PlaceService } from 'src/places/services/place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceEntity]),
    TypeOrmModule.forFeature([CompanyEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController, CompanyController, PlaceController],
  providers: [UserService, CompanyService, PlaceService, PasscryptService],
})
export class UserModule {}
