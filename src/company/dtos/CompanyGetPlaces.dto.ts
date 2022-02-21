import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CompanyGetPlacesDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  placeId: number;
}
