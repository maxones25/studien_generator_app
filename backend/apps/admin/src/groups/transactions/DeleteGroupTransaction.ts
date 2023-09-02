import { Transaction } from '@shared/modules/transaction/transaction';
import { ParticipantsRepository } from '@admin/participants/participants/participants.repository';
import { FormConfiguration, Group, Participant } from '@entities';
import { GroupsRepository } from '../groups.repository';
import { ConfigsRepository } from '@admin/forms/configs/repositories/configs.repository';

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
    const configsRepo = new ConfigsRepository(
      this.entityManager.getRepository(FormConfiguration),
    );

    if (deleteRelated) {
      if (hardDelete) {
        await participantsRepo.hardDelete({ groupId });
        await configsRepo.hardDelete({ groupId });
      } else {
        await configsRepo.softDelete({ groupId });
        await participantsRepo.softDelete({ groupId });
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
