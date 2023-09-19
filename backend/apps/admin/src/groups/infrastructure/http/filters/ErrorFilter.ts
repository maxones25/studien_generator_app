import { Catch, HttpStatus } from '@nestjs/common';
import { FormAlreadyAddedToGroupError, FormConfigIsAlreadyActiveError } from '@admin/groups/domain';
import { UseCaseErrorFilter, UseCaseError } from '@shared/modules/core';

@Catch(FormAlreadyAddedToGroupError, FormConfigIsAlreadyActiveError)
export class ErrorFilter extends UseCaseErrorFilter {
  resolveStatus(error: UseCaseError): HttpStatus {
    return HttpStatus.BAD_REQUEST;
  }
}
