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
import { PlaceEntity } from 'src/places/entitites/place.entity';
import { PlaceService } from 'src/places/services/place.service';
import { CompanyCreateDTO } from '../dtos/companyCreate.dto';
import { CompanyDeleteDTO } from '../dtos/companyDelete.dto';
import { CompanyGetPlacesDTO } from '../dtos/CompanyGetPlaces.dto';
import { CompanyReadDTO } from '../dtos/companyRead.dto';
import { CompanyUpdateDTO } from '../dtos/companyUpdate.dto';
import { CompanyEntity } from '../entitites/company.entity';
import { ICompanyDelete } from '../interfaces/companyDelete.interface';
import { ICompanyUpdate } from '../interfaces/companyUpdate.interface';
import { CompanyService } from '../services/company.service';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly placeService: PlaceService,
  ) {}

  // Create new company:
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CompanyCreateDTO })
  async create(@Request() req: any): Promise<object> {
    const body = req.body;
    const { id: requestId } = req.user;

    const cpnjJustNumbers = await body.cnpj.replace(/\D+/g, '');
    const NewUser = {
      ...body,
      main_responsible: requestId,
      cnpj: cpnjJustNumbers,
      createdAt: new Date(),
    };

    return await this.companyService.create(NewUser);
  }

  // Read company.
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBody({ type: CompanyReadDTO })
  async read(@Request() req: any): Promise<CompanyEntity> {
    const { cnpj } = req.body;
    const { id: requestId } = req.user;

    const cpnjJustNumbers = await cnpj.replace(/\D+/g, '');
    const ReaderInformation = {
      requestId: requestId,
      cnpj: cpnjJustNumbers,
    };

    return await this.companyService.read(ReaderInformation);
  }

  // Read all places company.
  @UseGuards(JwtAuthGuard)
  @Get('places')
  @ApiBody({ type: CompanyGetPlacesDTO })
  async allPlaces(@Request() req: any): Promise<PlaceEntity[]> {
    const { companyId } = req.body;
    return await this.placeService.getAllPlaces(companyId);
  }

  // Update company.
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBody({ type: CompanyUpdateDTO })
  async update(@Request() req: any): Promise<CompanyEntity> {
    const body = req.body;
    const { id: requestId } = req.user;

    const cpnjJustNumbers = await body.cnpj.replace(/\D+/g, '');

    const UpdateInformation: ICompanyUpdate = {
      requestId: requestId,
      ...body,
      cnpj: cpnjJustNumbers,
    };

    return await this.companyService.update(UpdateInformation);
  }

  // Delete company.
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBody({ type: CompanyDeleteDTO })
  async delete(@Request() req: any): Promise<CompanyEntity> {
    const body = req.body;
    const { id: requestId } = req.user;

    const cpnjJustNumbers = await body.cnpj.replace(/\D+/g, '');

    const DeleteInformation: ICompanyDelete = {
      requestId: requestId,
      cnpj: cpnjJustNumbers,
    };

    return await this.companyService.delete(DeleteInformation);
  }
}
