import {
  Request,
  Controller,
  Post,
  Get,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authorization/services/jwt.auth.guard';
import { PlaceCreateDTO } from '../dtos/placeCreate.dto';
import { PlaceDeleteDTO } from '../dtos/placeDelete.dto';
import { PlaceReadDTO } from '../dtos/placeRead.dto';
import { PlaceUpdateDTO } from '../dtos/placeUpdate.dto';
import { PlaceEntity } from '../entitites/place.entity';
import { IPlaceDelete } from '../interfaces/placeDelete.interface';
import { IPlaceUpdate } from '../interfaces/placeUpdate.interface';
import { PlaceService } from '../services/place.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly PlaceService: PlaceService) {}

  // Create new Place:
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: PlaceCreateDTO })
  async create(@Request() req: any): Promise<object> {
    const body = req.body;
    const { id: requestId } = req.user;

    const NewUser = {
      ...body,
      main_responsible: requestId,
      createdAt: new Date(),
    };

    return await this.PlaceService.create(NewUser);
  }

  // Read Place.
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBody({ type: PlaceReadDTO })
  async read(@Request() req: any): Promise<PlaceEntity> {
    const { placeId } = req.body;
    const { id: requestId } = req.user;

    const ReaderInformation = {
      requestId: requestId,
      placeId: placeId,
    };

    return await this.PlaceService.read(ReaderInformation);
  }

  // Update Place.
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBody({ type: PlaceUpdateDTO })
  async update(@Request() req: any): Promise<PlaceEntity> {
    const body = req.body;
    const { id: requestId } = req.user;

    const UpdateInformation: IPlaceUpdate = {
      requestId: requestId,
      ...body,
      placeId: body.placeId,
    };

    return await this.PlaceService.update(UpdateInformation);
  }

  // Delete Place.
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBody({ type: PlaceDeleteDTO })
  async delete(@Request() req: any): Promise<PlaceEntity> {
    const body = req.body;
    const { id: requestId } = req.user;

    const DeleteInformation: IPlaceDelete = {
      requestId: requestId,
      placeId: body.placeId,
    };

    return await this.PlaceService.delete(DeleteInformation);
  }
}
