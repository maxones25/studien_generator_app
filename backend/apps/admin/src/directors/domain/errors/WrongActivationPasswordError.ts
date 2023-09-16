import { UseCaseError } from '@shared/modules/core/UseCaseError';

export class WrongActivationPasswordError extends UseCaseError {
  constructor() {
    super('activationPassword invalid');
  }
}
