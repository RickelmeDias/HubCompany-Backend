import { ApiProperty } from '@nestjs/swagger';

export class companyReadByIdDTO {
  @ApiProperty()
  company_id: number;
}
