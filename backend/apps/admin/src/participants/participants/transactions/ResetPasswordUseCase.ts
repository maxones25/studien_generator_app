import { Inject } from '@nestjs/common';
import { ParticipantsService } from '../participants.service';
import { AppUriGenerator } from '../services/AppUriGenerator';
import { EntityManager } from 'typeorm';
import { Transaction } from '@shared/modules/transaction/transaction';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IPasswordService, PASSWORD_SERVICE } from '@shared/modules/password/IPasswordService';
type Input = {
  participantId: string;
};

export class ResetPasswordUseCase extends Transaction<Input, Record<string, string>> {
  constructor(
    @InjectEntityManager()
    em: EntityManager,
    @Inject(AppUriGenerator)
    private readonly appUriGenerator: AppUriGenerator,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
  ) {
    super(em);
  }

  protected async execute({ participantId }: Input): Promise<Record<string, string>> {
    const participantsService = ParticipantsService.build(this.entityManager, this.passwordService);

    const password = await participantsService.updatePassword(participantId);
    const participant = await participantsService.getById(participantId)
    const loginId = `${participant.study.name}-${participant.number}`;

    return { loginId, password };
  }
}
