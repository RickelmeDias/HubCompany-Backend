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
import { CompanyCreateDTO } from '../dtos/companyCreate.dto';
import { CompanyReadDTO } from '../dtos/companyRead.dto';
import { CompanyUpdateDTO } from '../dtos/companyUpdate.dto';
import { CompanyEntity } from '../entitites/company.entity';
import { ICompanyDelete } from '../interfaces/companyDelete.interface';
import { ICompanyUpdate } from '../interfaces/companyUpdate.interface';
import { CompanyService } from '../services/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

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
  @ApiBody({ type: CompanyUpdateDTO })
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
