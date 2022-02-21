import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlaceCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  cep: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  number: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  company_id: number;
}
