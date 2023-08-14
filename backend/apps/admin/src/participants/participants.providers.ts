import { Provider } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantGuard } from './guards/participant.guard';
import { PasswordService } from '@shared/modules/password/password.service';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';

const participantsProviders: Provider[] = [
  PasswordService,
  ParticipantsService,
  StartParticipantStudyTransaction,
  {
    provide: ParticipantGuard,
    useClass: ParticipantGuard,
  },
];

export default participantsProviders;
