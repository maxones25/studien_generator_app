import { Catch, HttpStatus } from '@nestjs/common';
import {
  InvalidFieldError,
  NameAlreadyExistsError,
} from '@admin/entities/domain';
import { UseCaseErrorFilter, UseCaseError } from '@shared/modules/core';

@Catch(NameAlreadyExistsError, InvalidFieldError)
export class ErrorFilter extends UseCaseErrorFilter {
  resolveStatus(error: UseCaseError): HttpStatus {
    return HttpStatus.BAD_REQUEST;
  }
}
