import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserDTO } from '../dtos/userCreate.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDTO): Promise<object> {
    const emailExists = await this.userRepository.findOne({
      email: user.email,
    });

    if (emailExists) {
      throw new HttpException(
        'This e-mail already been used.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const NewUser = {
      ...user,
      phone: user.phone.replace(/\D+/g, ''),
      cep: user.cep.replace(/\D+/g, ''),
      createdAt: new Date(),
    };

    await this.userRepository.save(NewUser);
    return { message: 'Account ' + user.email + ' has been created!' };
  }

  async findByEmail(userEmail: string): Promise<UserEntity> {
    const email = await this.userRepository.findOne({
      email: userEmail,
    });

    if (!email) {
      throw new HttpException(
        'This e-mail dont exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return email;
  }

  async findById(requestId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      id: requestId,
    });
    delete user.password;
    delete user.createdAt;
    delete user.isActive;

    if (!user) {
      throw new HttpException(
        'Error to get user informations',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
