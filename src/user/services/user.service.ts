import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserDTO } from '../dtos/userCreate.dto';
import { IUserUpdate } from '../interface/user.update.interface';

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
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'email',
              message: 'This e-mail already exists',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
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

  // Update
  async update(Request: IUserUpdate): Promise<object> {
    const { requestId, ...UpdateObject } = Request;
    const user = await this.findById(requestId);

    // Checking if have something to update

    if (Object.entries(UpdateObject).length < 1) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'name',
              message: 'Nothing field to update',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const userUpdated = {
      ...user,
      ...UpdateObject,
    };

    await this.userRepository.save(userUpdated);

    return { message: 'Account has been updated!' };
  }

  // Utils
  async findByEmail(userEmail: string): Promise<UserEntity> {
    const email = await this.userRepository.findOne({
      email: userEmail,
    });

    if (!email) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'email',
              message: 'This e-mail dont exists',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    delete email.createdAt;
    delete email.isActive;

    return email;
  }

  async findById(requestId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      id: requestId,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'user',
              message: 'Error to get user information',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }

  async validateUser(requestId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      id: requestId,
    });
    delete user.email;
    delete user.phone;
    delete user.cep;
    delete user.password;
    delete user.createdAt;
    delete user.isActive;

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'user',
              message: 'Error to get user information',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }
}
