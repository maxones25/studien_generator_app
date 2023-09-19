import { ConfigsRepository } from '@admin/forms/configs/repositories/configs.repository';
import { DeleteGroupUseCase } from '@admin/groups/application';
import {
  DELETE_GROUP_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { ParticipantsRepository } from '@admin/participants/participants/participants.repository';
import { Provider } from '@nestjs/common';

export const DeleteGroupUseCaseProvider: Provider = {
  provide: DELETE_GROUP_USE_CASE,
  useFactory(
    groupsRepository: IGroupsRepository,
    participantsRepository: ParticipantsRepository,
    configsRepository: ConfigsRepository,
  ) {
    return new DeleteGroupUseCase(
      groupsRepository,
      participantsRepository,
      configsRepository,
    );
  },
  inject: [GROUPS_REPOSITORY, ParticipantsRepository, ConfigsRepository],
};
