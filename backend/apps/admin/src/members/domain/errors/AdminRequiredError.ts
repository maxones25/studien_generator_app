import { UseCaseError } from '@shared/modules/core';

export class AdminRequiredError extends UseCaseError {
  constructor() {
    super('can not remove last admin from study');
  }
}
