import { ApiProperty } from '@nestjs/swagger';

export class CompanyUpdateDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  main_responsible: number;

  @ApiProperty()
  responsibles: Array<number>;

  @ApiProperty()
  places: Array<number>;
}
