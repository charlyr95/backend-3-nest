import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : (res as { message: string }).message || exception.message;
    }

    // mongoose validation error
    else if ((exception as { name: string }).name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;

      message = Object.values(
        (exception as { errors: { [key: string]: { message: string } } })
          .errors,
      ).map((err: { message: string }) => err.message);
    }

    // mongoose cast error (invalid ObjectId)
    else if ((exception as { name: string }).name === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
      message = `Invalid ${(exception as { path: string }).path}`;
    }

    // duplicate key
    else if ((exception as { code: number }).code === 11000) {
      status = HttpStatus.CONFLICT;
      message = 'Already exists';
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
