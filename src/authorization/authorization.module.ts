import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PasscryptService } from 'src/user/services/passcrypt.service';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthorizationController } from './controller/authorization.controller';
import { AuthorizationService } from './services/authorization.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './services/local.strategy';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3000s' },
    }),
  ],
  controllers: [AuthorizationController],
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthorizationService,
    UserService,
    PasscryptService,
  ],
})
export class AuthorizationModule {}
