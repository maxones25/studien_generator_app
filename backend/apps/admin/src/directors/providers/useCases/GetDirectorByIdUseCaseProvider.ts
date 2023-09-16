import { GetDirectorByIdUseCase } from '@admin/directors/application';
import {
  DIRECTORS_REPOSITORY,
  GET_DIRECTOR_BY_ID_USE_CASE,
  IDirectorsRepository,
} from '@admin/directors/domain';
import { Provider } from '@nestjs/common';

export const GetDirectorByIdUseCaseProvider: Provider = {
  provide: GET_DIRECTOR_BY_ID_USE_CASE,
  useFactory(directorsRepository: IDirectorsRepository) {
    return new GetDirectorByIdUseCase(directorsRepository);
  },
  inject: [DIRECTORS_REPOSITORY],
};
