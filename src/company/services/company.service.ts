import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entitites/company.entity';
import { ICompanyCreate } from '../interfaces/companyCreate.interface';
import { ICompanyRead } from '../interfaces/companyRead.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(company: ICompanyCreate): Promise<object> {
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

  async read(RequesterInfos: ICompanyRead): Promise<CompanyEntity> {
    const companyCNPJ = RequesterInfos.cnpj;

    const Company = await this.companyRepository.findOne({
      cnpj: companyCNPJ,
    });

    if (!Company) {
      throw new HttpException('This cnpj not exists.', HttpStatus.BAD_REQUEST);
    }

    return Company;
  }
}
