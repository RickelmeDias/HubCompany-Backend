import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authorization/services/jwt.auth.guard';
import { UserDTO } from '../dtos/userCreate.dto';
import { UserEntity } from '../entities/user.entity';
import { PasscryptService } from '../services/passcrypt.service';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly pcryptService: PasscryptService,
  ) {}

  @Post()
  @ApiBody({ type: UserDTO })
  async create(@Body() user: UserDTO): Promise<object> {
    user.password = await this.pcryptService.crypt(user.password);
    return await this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBody({})
  async findByEmail(@Request() req: any): Promise<UserEntity> {
    const { id: requestId } = req.user;
    return await this.userService.findById(requestId);
  }
}
