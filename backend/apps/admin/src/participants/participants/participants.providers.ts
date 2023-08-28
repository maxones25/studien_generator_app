import { Provider } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { PasswordService } from '@shared/modules/password/password.service';
import { ParticipantsRepository } from './participants.repository';
import { ParticipantGuard } from './guards/participant.guard';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';
import { CreateParticipantTransaction } from './transactions/CreateParticipantTransaction';
import { TransformStartStudySchedulesGuard } from './guards/TransformStartStudySchedulesGuard';

const participantsProviders: Provider[] = [
  PasswordService,
  ParticipantsService,
  StartParticipantStudyTransaction,
  CreateParticipantTransaction,
  ParticipantGuard,
  ParticipantsRepository,
  TransformStartStudySchedulesGuard,
];

export default participantsProviders;
