import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceController } from './controllers/place.controller';
import { PlaceEntity } from './entitites/place.entity';
import { PlaceService } from './services/place.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
