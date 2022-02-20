import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authorization/services/jwt.auth.guard';
import { CompanyCreateDTO } from '../dtos/companyCreate.dto';
import { CompanyService } from '../services/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CompanyCreateDTO })
  async create(@Request() req: any): Promise<object> {
    const body = req.body;
    const { id: creatorId } = req.user;

    const cpnjJustNumbers = body.cnpj.replace(/\D+/g, '');
    const NewUser = {
      ...body,
      main_responsible: creatorId,
      cnpj: cpnjJustNumbers,
      createdAt: new Date(),
    };

    return await this.companyService.create(NewUser);
  }
}
