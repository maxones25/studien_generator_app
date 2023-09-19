import { UseCaseError } from '@shared/modules/core';

export class FormConfigIsAlreadyActiveError extends UseCaseError {
  constructor() {
    super('form config is already active');
  }
}
