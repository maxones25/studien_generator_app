import { DeleteGroupUseCase } from '@admin/groups/application';
import {
  DELETE_GROUP_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
  IFormConfigsRepository,
  FORM_CONFIGS_REPOSITORY,
} from '@admin/groups/domain';
import { ParticipantsRepository } from '@admin/participants/participants/participants.repository';
import { Provider } from '@nestjs/common';

export const DeleteGroupUseCaseProvider: Provider = {
  provide: DELETE_GROUP_USE_CASE,
  useFactory(
    groupsRepository: IGroupsRepository,
    participantsRepository: ParticipantsRepository,
    formConfigsRepository: IFormConfigsRepository,
  ) {
    return new DeleteGroupUseCase(
      groupsRepository,
      participantsRepository,
      formConfigsRepository,
    );
  },
  inject: [GROUPS_REPOSITORY, ParticipantsRepository, FORM_CONFIGS_REPOSITORY],
};
