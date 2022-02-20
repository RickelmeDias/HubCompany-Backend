import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CompanyDeleteDTO {
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;
}
