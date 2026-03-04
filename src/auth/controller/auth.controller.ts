import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login() {
    return 'This action logs in a user';
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
