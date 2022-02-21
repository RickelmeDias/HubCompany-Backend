import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PlaceUpdateDTO {
  @ApiProperty()
  placeId: number;

  @ApiProperty()
  name?: string;

  @IsNotEmpty()
  @ApiProperty()
  cep?: string;

  @IsNotEmpty()
  @ApiProperty()
  number?: string;

  @ApiProperty()
  main_responsible?: number;

  @ApiProperty()
  responsibles?: Array<number>;
}
