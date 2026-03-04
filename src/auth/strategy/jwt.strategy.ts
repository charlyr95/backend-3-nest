/* eslint-disable */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'your_secret_key', // Replace with your actual secret key
    });
  }

  validate(payload: any) {
    return { payload };
  }
}
