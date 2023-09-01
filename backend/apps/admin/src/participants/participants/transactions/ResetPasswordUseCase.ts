import { Inject } from '@nestjs/common';
import { TransactionManager } from '@shared/modules/transaction/TransactionManager';
import { ParticipantsService } from '../participants.service';
import { PasswordService } from '@shared/modules/password/password.service';
import { AppUriGenerator } from '../services/AppUriGenerator';
import { EntityManager } from 'typeorm';
import { UseCase } from '@shared/modules/transaction/UseCase';
import { Transaction } from '@shared/modules/transaction/transaction';
import { InjectEntityManager } from '@nestjs/typeorm';
type Input = {
  participantId: string;
};

export class ResetPasswordUseCase extends Transaction<Input, string> {
  constructor(
    @InjectEntityManager()
    em: EntityManager,
    @Inject(AppUriGenerator)
    private readonly appUriGenerator: AppUriGenerator,
  ) {
    super(em);
  }

  protected async execute({ participantId }: Input): Promise<string> {
    const participantsService = ParticipantsService.build(this.entityManager);

    const password = await participantsService.updatePassword(participantId);

    return this.appUriGenerator.generate(participantId, password);
  }
}
