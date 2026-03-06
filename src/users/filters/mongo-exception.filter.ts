// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpStatus,
// } from '@nestjs/common';
// import { Response } from 'express';
// import mongoose from 'mongoose';
// import { MongoServerError } from 'mongodb';

// @Catch(mongoose.Error.ValidationError)
// export class MongoExceptionFilter implements ExceptionFilter {
//   catch(exception: mongoose.Error.ValidationError, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();

//     // Error de duplicado Mongo
//     if (isMongoServerError(exception) && exception.code === 11000) {
//       return response.status(HttpStatus.CONFLICT).json({
//         statusCode: 409,
//         message: 'Email already exists',
//       });
//     }

//     const errors = Object.values(exception.errors).map((err) => ({
//       field: err.path,
//       message: err.message,
//     }));

//     response.status(400).json({
//       statusCode: 400,
//       message: 'Validation failed',
//       errors,
//     });
//   }
// }

// function isMongoServerError(error: unknown): error is MongoServerError {
//   return error instanceof MongoServerError;
// }
