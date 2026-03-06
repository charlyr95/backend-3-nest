import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Observable, map } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data: T) => {
        return {
          success: true,
          statusCode: response.statusCode,
          message: response.statusMessage || 'OK',
          path: request.url,
          timestamp: new Date().toISOString(),
          data,
        };
      }),
    );
  }
}
