import { Provider } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { PasswordService } from '@shared/modules/password/password.service';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';
import { ParticipantsRepository } from './participants.repository';
import { Participant } from '@entities';
import { EntityManager } from 'typeorm';
import { ParticipantGuard } from './participant.guard';

const participantsProviders: Provider[] = [
  PasswordService,
  ParticipantsService,
  StartParticipantStudyTransaction,
  {
    provide: ParticipantGuard,
    useClass: ParticipantGuard,
  },
  {
    provide: ParticipantsRepository,
    useFactory: (entitityManager) =>
      new ParticipantsRepository(Participant, entitityManager),
    inject: [EntityManager],
  },
];

export default participantsProviders;
