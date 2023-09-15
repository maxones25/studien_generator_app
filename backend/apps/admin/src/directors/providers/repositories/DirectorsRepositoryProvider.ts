import { Provider } from '@nestjs/common';
import { DIRECTORS_REPOSITORY } from '../../domain/repositories/IDirectorsRepository';
import { DirectorsRepository } from '../../infrastructure/db/repositories/directors.repository';

export const DirectorsRepositoryProvider: Provider = {
  provide: DIRECTORS_REPOSITORY,
  useClass: DirectorsRepository,
};
