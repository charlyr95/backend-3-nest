import {
  Global,
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';
import { MongooseError } from 'mongoose';

@Global()
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string;

    if (exception instanceof MongooseError) {
      statusCode = 400;
      message = exception.message.toString();
    } else if (exception instanceof BadRequestException) {
      statusCode = 400;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : 'An error occurred';
    } else {
      statusCode = 500;
      message = 'Internal server error';
    }

    const apiResponse: ApiResponse<null> = {
      success: false,
      statusCode: statusCode,
      message: message,
      path: request.url,
      timestamp: new Date().toISOString(),
      data: null,
    };
    response.status(statusCode).json(apiResponse);
  }
}
