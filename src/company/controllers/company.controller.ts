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
import { PlaceEntity } from 'src/places/entitites/place.entity';
import { PlaceService } from 'src/places/services/place.service';
import { CompanyCreateDTO } from '../dtos/companyCreate.dto';
import { CompanyDeleteDTO } from '../dtos/companyDelete.dto';
import { companyEditResponsibleDTO } from '../dtos/companyEditResponsible.dto';
import { CompanyUpdateDTO } from '../dtos/companyUpdate.dto';
import { CompanyEntity } from '../entitites/company.entity';
import { ICompanyDelete } from '../interfaces/companyDelete.interface';
import { IEditResponsible } from '../interfaces/companyIEditResponsible';
import { ICompanyUpdate } from '../interfaces/companyUpdate.interface';
import { CompanyService } from '../services/company.service';

@ApiTags('company')
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
  @ApiBearerAuth()
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

  // Read company by ID.
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiParam({
    name: 'company_id',
    required: true,
    schema: {
      type: 'number',
    },
  })
  @ApiBearerAuth()
  async readById(@Request() req: any): Promise<CompanyEntity> {
    const { company_id } = req.query;
    const { id: requestId } = req.user;

    const ReaderInformation = {
      requestId: requestId,
      company_id: company_id,
    };

    return await this.companyService.readById(ReaderInformation);
  }

  // Read all places company.
  @UseGuards(JwtAuthGuard)
  @Get('places')
  @ApiParam({
    name: 'company_id',
    required: true,
    schema: {
      type: 'number',
    },
  })
  @ApiBearerAuth()
  async allPlaces(@Request() req: any): Promise<PlaceEntity[]> {
    const { company_id: companyId } = req.query;
    const { id: requestId } = req.user;

    return await this.placeService.getAllPlaces(requestId, companyId);
  }

  // Update company.
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBody({ type: CompanyUpdateDTO })
  @ApiBearerAuth()
  async update(@Request() req: any): Promise<CompanyEntity> {
    const body = req.body;
    const { id: requestId } = req.user;

    const cpnjJustNumbers = body.cnpj.replace(/\D+/g, '');

    const UpdateInformation: ICompanyUpdate = {
      requestId: requestId,
      ...body,
      cnpj: cpnjJustNumbers,
    };

    return await this.companyService.update(UpdateInformation);
  }

  // Add responsible (Update Responsibles).
  @UseGuards(JwtAuthGuard)
  @Put('/responsibles')
  @ApiBody({ type: companyEditResponsibleDTO })
  @ApiBearerAuth()
  async updateReponsibles(@Request() req: any): Promise<CompanyEntity> {
    const body = req.body;
    const { id: requestId } = req.user;

    const UpdateInformation: IEditResponsible = {
      requestId: requestId,
      companyId: body.company_id,
      email: body.email,
    };

    return await this.companyService.updateResponsibles(UpdateInformation);
  }

  // Delete company.
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBody({ type: CompanyDeleteDTO })
  @ApiBearerAuth()
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
