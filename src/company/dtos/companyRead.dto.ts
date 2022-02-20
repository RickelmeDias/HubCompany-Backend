import { ApiProperty } from '@nestjs/swagger';

export class CompanyReadDTO {
  @ApiProperty()
  cnpj: string;
}
