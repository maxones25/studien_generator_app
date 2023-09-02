import { Transaction } from '@shared/modules/transaction/transaction';
import { ParticipantsRepository } from '../participants.repository';
import { Participant, Task } from '@entities';
import { TasksRepository } from '@admin/participants/tasks/tasks.repository';

export type Input = {
  participantId: string;
  hardDelete: boolean;
  deleteRelated: boolean;
};

export class DeleteParticipantTransaction extends Transaction<Input, number> {
  protected async execute({
    participantId,
    hardDelete,
    deleteRelated = false,
  }: Input): Promise<number> {
    const participantsRepo = new ParticipantsRepository(
      this.entityManager.getRepository(Participant),
    );
    const tasksRepo = new TasksRepository(
      this.entityManager.getRepository(Task),
    );

    if (deleteRelated) {
      if (hardDelete) {
        await tasksRepo.hardDeleteByParticipant(participantId);
      } else {
        await tasksRepo.softDeleteByParticipant(participantId);
      }
    }

    if (hardDelete) {
      return await participantsRepo.hardDelete(participantId);
    } else {
      return await participantsRepo.softDelete(participantId);
    }
  }
}
