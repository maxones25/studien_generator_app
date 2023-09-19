import { UseCaseError } from '@shared/modules/core';

export class FormAlreadyAddedToGroupError extends UseCaseError {
  constructor() {
    super('form already added to group');
  }
}
