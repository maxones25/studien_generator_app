import { Provider } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { PasswordService } from '@shared/modules/password/password.service';
import { ParticipantsRepository } from './participants.repository';
import { ParticipantGuard } from './participant.guard';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';
import { CreateParticipantTransaction } from './transactions/CreateParticipantTransaction';

const participantsProviders: Provider[] = [
  PasswordService,
  ParticipantsService,
  StartParticipantStudyTransaction,
  CreateParticipantTransaction,
  ParticipantGuard,
  ParticipantsRepository,
];

export default participantsProviders;
