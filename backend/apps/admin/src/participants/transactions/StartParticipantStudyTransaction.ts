import { Participant, ParticipantAttributes } from '@entities';
import { Transaction } from '@shared/modules/transaction/transaction';
import { ParticipantAttribute } from '../ParticipantAttribute';
import datetime from '@shared/modules/datetime/datetime';

type TransactionInput = {
  studyId: string;
  participantId: string;
};

export class StartParticipantStudyTransaction extends Transaction<
  TransactionInput,
  void
> {
  protected async execute({ participantId }: TransactionInput): Promise<void> {
    await this.addStartTimestampToParticipant(participantId);
  }

  private async addStartTimestampToParticipant(participantId: string) {
    const repo = this.entityManager.getRepository(ParticipantAttributes);

    const attribute = new ParticipantAttributes();

    attribute.participantId = participantId;
    attribute.key = ParticipantAttribute.StartedAt;
    attribute.value = JSON.stringify(datetime.isoDate());

    await repo.insert(attribute);
  }
}
