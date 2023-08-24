import { Provider } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { PasswordService } from '@shared/modules/password/password.service';
import { ParticipantsRepository } from './participants.repository';
import { ParticipantGuard } from './participant.guard';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';

const participantsProviders: Provider[] = [
  PasswordService,
  ParticipantsService,
  StartParticipantStudyTransaction,
  ParticipantGuard,
  ParticipantsRepository,
];

export default participantsProviders;
