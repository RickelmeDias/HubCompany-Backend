import { Request, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authorization/services/jwt.auth.guard';
import { CompanyCreateDTO } from '../dtos/companyCreate.dto';
import { CompanyReadDTO } from '../dtos/companyRead.dto';
import { CompanyEntity } from '../entitites/company.entity';
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

    const cpnjJustNumbers = body.cnpj.replace(/\D+/g, '');
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

    const cpnjJustNumbers = cnpj.replace(/\D+/g, '');
    const ViewerInformation = {
      requestId: requestId,
      cnpj: cpnjJustNumbers,
    };

    return await this.companyService.read(ViewerInformation);
  }
}
