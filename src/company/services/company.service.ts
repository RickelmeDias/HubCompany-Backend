import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyCreateDTO } from '../dtos/companyCreate.dto';
import { CompanyEntity } from '../entitites/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(company: CompanyCreateDTO): Promise<object> {
    const cnpjExists = await this.companyRepository.findOne({
      cnpj: company.cnpj,
    });

    if (cnpjExists) {
      throw new HttpException(
        'This cnpj already been signed-up.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.companyRepository.save(company);
    return { message: 'Account ' + company.name + ' has been created!' };
  }
}
