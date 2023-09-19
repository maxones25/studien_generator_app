import { ConfigsRepository } from '@admin/forms/configs/repositories/configs.repository';
import {
  DeleteGroupUseCaseInput,
  IDeleteGroupUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { ParticipantsRepository } from '@admin/participants/participants/participants.repository';
import { DeletedResult } from '@shared/modules/core';

export class DeleteGroupUseCase implements IDeleteGroupUseCase {
  constructor(
    private readonly groupsRepository: IGroupsRepository,
    private readonly participantsRepository: ParticipantsRepository,
    private readonly configsRepository: ConfigsRepository,
  ) {}

  async execute({
    groupId,
    deleteRelated,
    hardDelete,
  }: DeleteGroupUseCaseInput): Promise<DeletedResult> {
    if (deleteRelated) {
      if (hardDelete) {
        await this.participantsRepository.hardDelete({ groupId });
        await this.configsRepository.hardDelete({ groupId });
      } else {
        await this.configsRepository.softDelete({ groupId });
        await this.participantsRepository.softDelete({ groupId });
      }
    } else {
      await this.participantsRepository.removeGroupByGroup(groupId);
    }

    if (hardDelete) {
      return await this.groupsRepository.hardDeleteGroup(groupId);
    } else {
      return await this.groupsRepository.softDeleteGroup(groupId);
    }
  }
}
