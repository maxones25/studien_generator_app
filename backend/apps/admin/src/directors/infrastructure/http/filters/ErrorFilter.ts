import { Catch, HttpStatus } from '@nestjs/common';
import {
  WrongActivationPasswordError,
  WrongPasswordError,
  DirectorExistsAlreadyError,
  DirectorNotFoundError,
} from '../../../domain';
import { UseCaseErrorFilter, UseCaseError } from '@shared/modules/core';

@Catch(
  WrongActivationPasswordError,
  WrongPasswordError,
  DirectorExistsAlreadyError,
  DirectorNotFoundError,
)
export class ErrorFilter extends UseCaseErrorFilter {
  resolveStatus(error: UseCaseError): HttpStatus {
    if (error instanceof DirectorExistsAlreadyError) {
      return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.UNAUTHORIZED;
  }
}
