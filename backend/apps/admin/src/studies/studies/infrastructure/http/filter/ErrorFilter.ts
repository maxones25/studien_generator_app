import { Catch, HttpStatus } from '@nestjs/common';
import { UseCaseErrorFilter, UseCaseError } from '@shared/modules/core';
import { EndBeforeStartError } from '@admin/studies/domain';

@Catch(EndBeforeStartError)
export class ErrorFilter extends UseCaseErrorFilter {
  resolveStatus(_: UseCaseError): HttpStatus {
    return HttpStatus.BAD_REQUEST;
  }
}
