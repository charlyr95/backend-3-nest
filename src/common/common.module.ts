import { Module } from '@nestjs/common';
import { HttpResponseInterceptor } from './interceptors/http-response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpResponseInterceptor,
    },
  ],
})
export class CommonModule {}
