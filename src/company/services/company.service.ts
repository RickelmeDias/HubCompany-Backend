/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entitites/company.entity';
import { ICompanyCreate } from '../interfaces/companyCreate.interface';
import { ICompanyDelete } from '../interfaces/companyDelete.interface';
import { ICompanyRead } from '../interfaces/companyRead.interface';
import { ICompanyUpdate } from '../interfaces/companyUpdate.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  // Create
  async create(Request: ICompanyCreate): Promise<object> {
    await this.validateCNPJ(Request.cnpj, 'CHECK_IF_EXISTS');

    const NewCompany = Request;

    await this.companyRepository.save(NewCompany);
    return { message: 'Account ' + NewCompany.name + ' has been created!' };
  }

  // Read
  async read(Request: ICompanyRead): Promise<CompanyEntity> {
    const Company: CompanyEntity = await this.validateCNPJ(
      Request.cnpj,
      'GET_COMPANY_IF_EXISTS',
    );

    const isResponsible = await this.isResponsible(
      Request.requestId,
      Company.main_responsible,
      Company.responsibles,
    );

    if (isResponsible) {
      return Company;
    } else {
      throw new HttpException(
        'You arent responsible for this company.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Update
  async update(Request: ICompanyUpdate): Promise<CompanyEntity> {
    const Company: CompanyEntity = await this.validateCNPJ(
      Request.cnpj,
      'GET_COMPANY_IF_EXISTS',
    );

    const isResponsible = await this.isResponsible(
      Request.requestId,
      Company.main_responsible,
      null,
    );

    // Checking if have something to update

    const { requestId, ...UpdateObject } = Request;
    if (Object.entries(UpdateObject).length < 2) {
      throw new HttpException(
        'Nothing field to update.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (isResponsible) {
      if (UpdateObject.hasOwnProperty('new_cnpj')) {
        const { new_cnpj, ...update } = UpdateObject;
        await this.validateCNPJ(Request.new_cnpj, 'CHECK_IF_EXISTS');
        const companyUpdated = {
          ...Company,
          ...update,
          cnpj: Request.new_cnpj.replace(/\D+/g, ''),
        };
        return await this.companyRepository.save(companyUpdated);
      } else {
        const companyUpdated = {
          ...Company,
          ...UpdateObject,
          cnpj: Company.cnpj.replace(/\D+/g, ''),
        };
        return await this.companyRepository.save(companyUpdated);
      }
    } else {
      throw new HttpException(
        'You are not main responsible to update a company.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Delete
  async delete(Request: ICompanyDelete): Promise<CompanyEntity> {
    const companyToRemove = await this.companyRepository.findOne({
      cnpj: Request.cnpj,
    });

    const isResponsible = await this.isResponsible(
      Request.requestId,
      companyToRemove.main_responsible,
      null,
    );

    if (isResponsible) {
      return await this.companyRepository.remove(companyToRemove);
    } else {
      throw new HttpException(
        'You arent responsible for this company.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Checking if the request is responsible for company
  async isResponsible(
    requesterId: number,
    main_responsible: number,
    responsibles?: Array<number>,
  ): Promise<boolean> {
    if (main_responsible == requesterId) {
      return true;
    }

    if (responsibles != null && responsibles.length > 0) {
      for (const resposible of responsibles) {
        if (resposible == requesterId) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  // Validate if CNPJ already exists on database and the value from req
  async validateCNPJ(cnpj: string, mode: string): Promise<CompanyEntity> {
    const _cnpj = cnpj.replace(/\D+/g, '');

    if (_cnpj.length != 14) {
      throw new HttpException(
        'The CNPJ need to have 14 digits.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const Company: CompanyEntity = await this.companyRepository.findOne({
      cnpj: _cnpj,
    });

    if (Company && mode.toUpperCase() == 'CHECK_IF_EXISTS') {
      throw new HttpException(
        'This CNPJ already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Company == undefined && mode.toUpperCase() == 'GET_COMPANY_IF_EXISTS') {
      throw new HttpException(
        'This CPNJ do not exists.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return Company;
    }
  }
}
