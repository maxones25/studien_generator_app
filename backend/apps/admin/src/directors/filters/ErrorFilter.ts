import { Catch, HttpStatus } from '@nestjs/common';
import {
  WrongActivationPasswordError,
  WrongPasswordError,
  DirectorExistsAlreadyError,
  DirectorNotFoundError,
} from '../domain';
import { UseCaseErrorFilter } from '@shared/modules/core/UseCaseErrorFilter';
import { UseCaseError } from '@shared/modules/core/UseCaseError';

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
