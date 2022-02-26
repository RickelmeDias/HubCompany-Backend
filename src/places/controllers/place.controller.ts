import {
  Request,
  Controller,
  Post,
  Get,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authorization/services/jwt.auth.guard';
import { PlaceCreateDTO } from '../dtos/placeCreate.dto';
import { PlaceDeleteDTO } from '../dtos/placeDelete.dto';
import { placeEditResponsibleDTO } from '../dtos/placeEditResponsible.dto';
import { PlaceUpdateDTO } from '../dtos/placeUpdate.dto';
import { PlaceEntity } from '../entitites/place.entity';
import { IPlaceDelete } from '../interfaces/placeDelete.interface';
import { IPlaceUpdate } from '../interfaces/placeUpdate.interface';
import { IEditResponsible } from '../interfaces/ṕlaceIEditResponsible';
import { PlaceService } from '../services/place.service';

@ApiTags('place')
@Controller('place')
export class PlaceController {
  constructor(private readonly PlaceService: PlaceService) {}

  // Create new Place:
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: PlaceCreateDTO })
  @ApiBearerAuth()
  async create(@Request() req: any): Promise<object> {
    const body = req.body;
    const { id: requestId } = req.user;

    const NewUser = {
      requestId: requestId,
      ...body,
      main_responsible: requestId,
      createdAt: new Date(),
    };

    return await this.PlaceService.create(NewUser);
  }

  // Read Place.
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiParam({
    name: 'place_id',
    required: true,
    schema: {
      type: 'number',
    },
  })
  @ApiBearerAuth()
  async read(@Request() req: any): Promise<PlaceEntity> {
    const { place_id: placeId } = req.query;
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
  @ApiBearerAuth()
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

  // Add responsible (Update Responsibles).
  @UseGuards(JwtAuthGuard)
  @Put('/responsibles')
  @ApiBody({ type: placeEditResponsibleDTO })
  @ApiBearerAuth()
  async updateReponsibles(@Request() req: any): Promise<PlaceEntity> {
    const body = req.body;
    const { id: requestId } = req.user;

    const UpdateInformation: IEditResponsible = {
      requestId: requestId,
      placeId: body.place_id,
      email: body.email,
    };

    return await this.PlaceService.updateResponsibles(UpdateInformation);
  }

  // Delete Place.
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBody({ type: PlaceDeleteDTO })
  @ApiBearerAuth()
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
