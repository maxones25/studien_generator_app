import { Provider } from '@nestjs/common';
import { PasswordService } from '../auth/password.service';
import { ParticipantsService } from './participants.service';
import { ParticipantGuard } from './guards/participant.guard';

const participantsProviders: Provider[] = [
  PasswordService,
  ParticipantsService,
  {
    provide: ParticipantGuard,
    useClass: ParticipantGuard,
  },
];

export default participantsProviders;
