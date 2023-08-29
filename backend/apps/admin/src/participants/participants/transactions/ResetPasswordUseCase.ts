import { Inject } from '@nestjs/common';
import { TransactionManager } from '@shared/modules/transaction/TransactionManager';
import { ParticipantsService } from '../participants.service';
import { PasswordService } from '@shared/modules/password/password.service';
import { AppUriGenerator } from '../services/AppUriGenerator';
import { EntityManager } from 'typeorm';
import { UseCase } from '@shared/modules/transaction/UseCase';
type Input = {
  participantId: string;
};

export class ResetPasswordUseCase extends UseCase<
  Input,
  string,
  { passwordService: PasswordService }
> {
  private participantsService: ParticipantsService;

  constructor(
    @Inject(TransactionManager)
    tm: TransactionManager,
    @Inject(PasswordService)
    passwordService: PasswordService,
    @Inject(AppUriGenerator)
    private readonly appUriGenerator: AppUriGenerator,
  ) {
    super(tm, { passwordService });
  }

  async setup(entityManager: EntityManager, { passwordService }) {
    this.participantsService = ParticipantsService.build(
      entityManager,
      passwordService,
    );
  }

  protected async execute({ participantId }: Input): Promise<string> {
    const password = await this.participantsService.updatePassword(
      participantId,
    );
    return this.appUriGenerator.generate(participantId, password);
  }
}
