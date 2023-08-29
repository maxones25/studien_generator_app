import { Chat, Participant } from '@entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Transaction } from '@shared/modules/transaction/transaction';
import { EntityManager } from 'typeorm';
import { Inject } from '@nestjs/common';
import { PasswordService } from '@shared/modules/password/password.service';

type TransactionInput = {
  studyId: string;
  number: string;
  groupId: string;
};

export class CreateParticipantTransaction extends Transaction<
  TransactionInput,
  string
> {
  constructor(
    @InjectEntityManager()
    em: EntityManager,
    @Inject(PasswordService)
    private readonly passwordService: PasswordService,
  ) {
    super(em);
  }

  protected async execute({
    studyId,
    number,
    groupId,
  }: TransactionInput): Promise<string> {
    const participantRepo = this.entityManager.getRepository(Participant);

    const hashedPassword = await this.passwordService.generateHashed(10);

    const participant = new Participant();

    participant.studyId = studyId;
    participant.groupId = groupId;
    participant.number = number;
    participant.password = hashedPassword;

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
