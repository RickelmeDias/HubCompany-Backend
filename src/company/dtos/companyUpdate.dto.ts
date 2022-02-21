import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CompanyUpdateDTO {
  @ApiProperty()
  name?: string;

  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

  @IsNotEmpty()
  @ApiProperty()
  new_cnpj?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  main_responsible?: number;

  @ApiProperty()
  responsibles?: Array<number>;

  @ApiProperty()
  places?: Array<number>;
}
