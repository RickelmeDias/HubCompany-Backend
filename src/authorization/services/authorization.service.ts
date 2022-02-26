import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/interface/user.interface';
import { PasscryptService } from 'src/user/services/passcrypt.service';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthorizationService {
  constructor(
    private userService: UserService,
    private passCrypt: PasscryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string): Promise<User> {
    const user: UserEntity = await this.userService.findByEmail(userEmail);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'password',
              message: 'Auth error.',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const { id, email, name } = user;

    const validation: boolean = await this.passCrypt.validate(
      userPassword,
      user.password,
    );

    if (!validation) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'password',
              message: 'Auth error.',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      return { id: id, name: name, email: email };
    }
  }

  async login(user: User): Promise<object> {
    const { id, email } = user;

    const payload = {
      id: id,
      email: email,
    };

    return {
      acess_token: this.jwtService.sign(payload),
    };
  }
}
