import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return await this.authService.login(req.user);
  }

  @Post('logout')
  logout() {
    return 'This action logs out a user';
  }

  @Post('register')
  register() {
    return 'This action registers a user';
  }
}
