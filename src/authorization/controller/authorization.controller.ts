import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthorizationService } from '../services/authorization.service';
import { LocalAuthGuard } from '../services/local-auth.guard';

@Controller('authorization')
export class AuthorizationController {
  constructor(private authService: AuthorizationService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
