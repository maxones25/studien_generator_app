import { UseCaseError } from '@shared/modules/core';

export class NameAlreadyExistsError extends UseCaseError {
  constructor() {
    super('name already exists');
  }
}
