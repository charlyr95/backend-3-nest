import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const tokens = await this.authService.login(req.user);
    const access_token = tokens?.access_token ?? '';
    const refresh_token = tokens?.refresh_token ?? '';
    return { access_token, refresh_token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    return 'This action logs out a user';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }

  @Post('register')
  register() {
    return 'This action registers a user';
  }
}
