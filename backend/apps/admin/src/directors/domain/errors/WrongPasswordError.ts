import { UseCaseError } from '@shared/modules/core/UseCaseError';

export class WrongPasswordError extends UseCaseError {
  constructor() {
    super('password invalid');
  }
}
