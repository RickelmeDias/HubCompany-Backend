import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserUpdateDTO {
  @IsNumber()
  @ApiProperty()
  requestId: number;

  @IsString()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsPhoneNumber('BR')
  @ApiProperty()
  phone?: string;

  @IsString()
  @ApiProperty()
  cep?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password?: string;
}
