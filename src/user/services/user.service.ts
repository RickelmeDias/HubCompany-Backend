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
    const emailExists = await this.userRepository.findOne({
      email: userEmail,
    });

    if (!emailExists) {
      throw new HttpException(
        'This e-mail dont exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return emailExists;
  }
}
