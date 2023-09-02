import { Provider } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { PasswordService } from '@shared/modules/password/password.service';
import { ParticipantsRepository } from './participants.repository';
import { ParticipantGuard } from './guards/participant.guard';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';
import { CreateParticipantTransaction } from './transactions/CreateParticipantTransaction';
import { AppUriGenerator } from './services/AppUriGenerator';
import { AttributesRepository } from './attributes.repository';
import { SchedulesTransformer } from './services/SchedulesTransformer';
import { ResetPasswordUseCase } from './transactions/ResetPasswordUseCase';
import { DeleteParticipantTransaction } from './transactions/DeleteParticipantTransaction';

const participantsProviders: Provider[] = [
  ParticipantGuard,
  PasswordService,
  ParticipantsService,
  StartParticipantStudyTransaction,
  CreateParticipantTransaction,
  DeleteParticipantTransaction,
  ResetPasswordUseCase,
  AttributesRepository,
  ParticipantsRepository,
  AppUriGenerator,
  SchedulesTransformer,
];

export default participantsProviders;
