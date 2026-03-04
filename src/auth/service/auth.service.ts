import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { password: _password, ...result } = user; // Exclude password
      return result;
    }
    return null;
  }

  async login(
    user: any,
  ): Promise<{ access_token: string; refresh_token: string } | null> {
    if (!user) {
      return null; // Return null if user validation fails
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = user; // You can customize the payload as needed
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload);
    return { access_token, refresh_token };
  }
}
