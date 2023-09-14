import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { UseCaseError } from '@shared/modules/core/UseCaseError';
import { Response } from 'express';

export abstract class UseCaseErrorFilter implements ExceptionFilter {
  abstract resolveStatus(exception: UseCaseError): HttpStatus | undefined;

  catch(exception: UseCaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const status = this.resolveStatus(exception) ?? HttpStatus.BAD_REQUEST;

    response.status(status).json({ message: exception.message });
  }
}
