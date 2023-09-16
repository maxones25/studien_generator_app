import { GetDirectorsUseCase } from '@admin/directors/application';
import {
  DIRECTORS_REPOSITORY,
  GET_DIRECTORS_USE_CASE,
  IDirectorsRepository,
} from '@admin/directors/domain';
import { Provider } from '@nestjs/common';

export const GetDirectorsUseCaseProvider: Provider = {
  provide: GET_DIRECTORS_USE_CASE,
  useFactory(directorsRepository: IDirectorsRepository) {
    return new GetDirectorsUseCase(directorsRepository);
  },
  inject: [DIRECTORS_REPOSITORY],
};
