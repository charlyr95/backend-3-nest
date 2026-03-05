// filters/mongo-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface MongoError {
  code?: number;
}

@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Error de duplicado Mongo
    if ((exception as MongoError)?.code === 11000) {
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: 409,
        message: 'El recurso ya existe',
      });
    }

    // Si ya es una excepción HTTP, respetarla
    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    // Error genérico
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
