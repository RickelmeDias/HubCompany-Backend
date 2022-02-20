import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [AuthorizationModule, CompanyModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
