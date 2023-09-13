import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UseCaseError } from './UseCaseError';

@Catch(UseCaseError)
export class UseCaseErrorFilter implements ExceptionFilter {
  catch(exception: UseCaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;

    response.status(HttpStatus.BAD_REQUEST).json({
      message,
    });
  }
}
