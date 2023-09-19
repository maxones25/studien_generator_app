import { Catch, HttpStatus } from '@nestjs/common';
import {
  FormAlreadyAddedToGroupError,
  FormConfigIsAlreadyActiveError,
  FormConfigIsAlreadyInactiveError,
  FormConfigIsAlreadyTimeDependentError,
  FormConfigIsAlreadyTimeIndependentError,
  GroupNotFoundError,
  FormConfigNotFoundError,
} from '@admin/groups/domain';
import { UseCaseErrorFilter, UseCaseError } from '@shared/modules/core';

@Catch(
  FormAlreadyAddedToGroupError,
  FormConfigIsAlreadyActiveError,
  FormConfigIsAlreadyInactiveError,
  FormConfigIsAlreadyTimeDependentError,
  FormConfigIsAlreadyTimeIndependentError,
  GroupNotFoundError,
  FormConfigNotFoundError,
)
export class ErrorFilter extends UseCaseErrorFilter {
  resolveStatus(_: UseCaseError): HttpStatus {
    return HttpStatus.BAD_REQUEST;
  }
}
