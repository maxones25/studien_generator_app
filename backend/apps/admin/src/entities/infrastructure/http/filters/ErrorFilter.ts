import { Catch, HttpStatus } from '@nestjs/common';
import { NameAlreadyExistsError } from '../../../domain';
import { UseCaseErrorFilter, UseCaseError } from '@shared/modules/core';

@Catch(NameAlreadyExistsError)
export class ErrorFilter extends UseCaseErrorFilter {
  resolveStatus(error: UseCaseError): HttpStatus {
    return HttpStatus.BAD_REQUEST;
  }
}
