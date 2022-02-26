import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authorization/services/jwt.auth.guard';
import { CompanyService } from 'src/company/services/company.service';
import { UserDTO } from '../dtos/userCreate.dto';
import { UserUpdateDTO } from '../dtos/userUpdate.dto';
import { UserEntity } from '../entities/user.entity';
import { IUserUpdate } from '../interface/user.update.interface';
import { PasscryptService } from '../services/passcrypt.service';
import { UserService } from '../services/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly pcryptService: PasscryptService,
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  @ApiBody({ type: UserDTO })
  async create(@Body() user: UserDTO): Promise<object> {
    user.password = await this.pcryptService.crypt(user.password);
    return await this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBody({ type: UserUpdateDTO })
  @ApiBearerAuth()
  async update(@Request() req: any): Promise<object> {
    const { id: requestId } = req.user;
    const body = req.body;

    const UpdateRequest: IUserUpdate = {
      requestId,
      ...body,
    };

    return await this.userService.update(UpdateRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  async getUserInfos(@Request() req: any): Promise<UserEntity> {
    const { id: requestId } = req.user;
    const user = await this.userService.findById(requestId);
    delete user.password;
    delete user.createdAt;
    delete user.isActive;

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/companies')
  @ApiBearerAuth()
  async getUserCompanies(@Request() req: any): Promise<any> {
    const { id: requestId } = req.user;
    return await this.companyService.getUserCompanies(requestId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  @ApiBearerAuth()
  async validateAuth(@Request() req: any): Promise<UserEntity> {
    const { id: requestId } = req.user;
    return await this.userService.validateUser(requestId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by_id/info')
  @ApiParam({
    name: 'user_id',
    required: true,
    schema: {
      type: 'number',
    },
  })
  @ApiBearerAuth()
  async getUserEmail(@Request() req: any): Promise<UserEntity> {
    const { user_id: requestId } = req.query;
    const user = await this.userService.findById(requestId);
    delete user.cep;
    delete user.phone;
    delete user.password;
    delete user.createdAt;
    delete user.isActive;

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by_email/id')
  @ApiParam({
    name: 'user_email',
    required: true,
    schema: {
      type: 'number',
    },
  })
  @ApiBearerAuth()
  async getUserId(@Request() req: any): Promise<UserEntity> {
    const { user_email: userEmail } = req.query;
    const user = await this.userService.findByEmail(userEmail);
    delete user.cep;
    delete user.phone;
    delete user.password;
    delete user.createdAt;
    delete user.isActive;
    delete user.email;
    delete user.name;

    return user;
  }
}
