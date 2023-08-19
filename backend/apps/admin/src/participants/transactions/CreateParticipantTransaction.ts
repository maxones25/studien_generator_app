import { Chat, Participant } from '@entities';
import { Transaction } from '@shared/modules/transaction/transaction';

type TransactionInput = {
  studyId: string;
  number: string;
  groupId: string
  password: string,
};

export class CreateParticipantTransaction extends Transaction<
  TransactionInput,
  string
> {
  protected async execute({ studyId, number, groupId, password }: TransactionInput): Promise<string> {
    const participantRepo = this.entityManager.getRepository(Participant);
    const participant = new Participant();


    participant.studyId = studyId;
    participant.groupId = groupId;
    participant.number = number;
    participant.password = password;

    await participantRepo.insert(participant);
    await this.createParticipantChat(participant.id, studyId);

    return participant.id;
  }

  private async createParticipantChat(participantId: string, studyId: string) {
    const repo = this.entityManager.getRepository(Chat);

    const chat = new Chat();

    chat.participantId = participantId;
    chat.studyId = studyId;

    await repo.insert(chat);
  }
}
