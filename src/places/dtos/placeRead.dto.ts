import { ApiProperty } from '@nestjs/swagger';

export class PlaceReadDTO {
  @ApiProperty()
  placeId: number;
}
