import { UseCaseError } from '@shared/modules/core';

export class FormConfigIsAlreadyTimeDependentError extends UseCaseError {
  constructor() {
    super('form is already time dependent');
  }
}
