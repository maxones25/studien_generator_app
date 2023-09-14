import { Chat, Participant } from '@entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Transaction } from '@shared/modules/transaction/transaction';
import { EntityManager } from 'typeorm';
import { Inject } from '@nestjs/common';
import { IPasswordService, PASSWORD_SERVICE } from '@shared/modules/password/IPasswordService';

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
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
  ) {
    super(em);
  }

  protected async execute({
    studyId,
    number,
    groupId,
  }: TransactionInput): Promise<string> {
    const participantRepo = this.entityManager.getRepository(Participant);
    
    const password = this.passwordService.generate();
    const hashedPassword = await this.passwordService.hash(password);

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
