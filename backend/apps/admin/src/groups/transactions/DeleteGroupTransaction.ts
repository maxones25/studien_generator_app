import { Transaction } from '@shared/modules/transaction/transaction';
import { ParticipantsRepository } from '@admin/participants/participants/participants.repository';
import { Group, Participant } from '@entities';
import { GroupsRepository } from '../groups.repository';

type Input = {
  groupId: string;
  hardDelete: boolean;
  deleteRelated: boolean;
};

export class DeleteGroupTransaction extends Transaction<Input, number> {
  async execute({ deleteRelated, hardDelete, groupId }: Input) {
    const participantsRepo = new ParticipantsRepository(
      this.entityManager.getRepository(Participant),
    );
    const groupsRepo = new GroupsRepository(
      this.entityManager.getRepository(Group),
    );

    if (deleteRelated) {
      if (hardDelete) {
        await participantsRepo.hardDeleteByGroup(groupId);
      } else {
        await participantsRepo.softDeleteByGroup(groupId);
      }
    } else {
      await participantsRepo.removeGroupByGroup(groupId);
    }

    if (hardDelete) {
      return await groupsRepo.hardDelete(groupId);
    } else {
      return await groupsRepo.softDelete(groupId);
    }
  }
}
