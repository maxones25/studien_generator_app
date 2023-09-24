import { FORMS_REPOSITORY, IFormsRepository } from '@admin/forms/forms/domain';
import { GetAvailableFormsByGroupUseCase } from '@admin/groups/application';
import { GET_AVAILABLE_FORMS_BY_GROUP_USE_CASE } from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const GetAvailableFormsByGroupUseCaseProvider: Provider = {
  provide: GET_AVAILABLE_FORMS_BY_GROUP_USE_CASE,
  useFactory(formsRepository: IFormsRepository) {
    return new GetAvailableFormsByGroupUseCase(formsRepository);
  },
  inject: [FORMS_REPOSITORY],
};
