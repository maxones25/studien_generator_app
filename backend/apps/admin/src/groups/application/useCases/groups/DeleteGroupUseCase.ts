import {
  DeleteGroupUseCaseInput,
  IDeleteGroupUseCase,
  IFormConfigsRepository,
  IGroupsRepository,
} from '@admin/groups/domain';
import { ParticipantsRepository } from '@admin/participants/participants/participants.repository';
import { DeletedResult } from '@shared/modules/core';

export class DeleteGroupUseCase implements IDeleteGroupUseCase {
  constructor(
    private readonly groupsRepository: IGroupsRepository,
    private readonly participantsRepository: ParticipantsRepository,
    private readonly formConfigsRepository: IFormConfigsRepository,
  ) {}

  async execute({
    groupId,
    deleteRelated,
    hardDelete,
  }: DeleteGroupUseCaseInput): Promise<DeletedResult> {
    if (deleteRelated) {
      if (hardDelete) {
        await this.participantsRepository.hardDelete({ groupId });
        await this.formConfigsRepository.hardDelete({ groupId });
      } else {
        await this.formConfigsRepository.softDelete({ groupId });
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
