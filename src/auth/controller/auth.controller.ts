import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { cookieOptions } from '../../config/cookie-config';
import { LoginDto } from '../dto/login.dto';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
    @Req() req: express.Request,
  ) {
    const tokens = await this.authService.login(req.user);
    const access_token = tokens?.access_token ?? '';
    const refresh_token = tokens?.refresh_token ?? '';
    res.cookie('access_token', access_token, cookieOptions.access.options);
    res.cookie('refresh_token', refresh_token, cookieOptions.refresh.options);
    return { access_token, refresh_token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    return 'This action logs out a user';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: express.Request) {
    return req.user;
  }

  @Post('register')
  register() {
    return 'This action registers a user';
  }
}
