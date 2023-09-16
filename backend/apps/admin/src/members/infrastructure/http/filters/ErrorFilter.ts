import { Catch, HttpStatus } from '@nestjs/common';
import { UseCaseErrorFilter, UseCaseError } from '@shared/modules/core';
import { AdminRequiredError } from '@admin/members/domain';

@Catch(AdminRequiredError)
export class ErrorFilter extends UseCaseErrorFilter {
  resolveStatus(error: UseCaseError): HttpStatus {
    return HttpStatus.BAD_REQUEST;
  }
}
