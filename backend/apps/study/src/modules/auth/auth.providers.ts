import { Provider } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { IsParticipantDeletedGuard } from './guards/IsParticipantDeleted.guard';
import { ParticipantsService } from '@admin/participants/participants/participants.service';
import { ParticipantsRepository } from '@admin/participants/participants/participants.repository';
import { AttributesRepository } from '@admin/participants/participants/attributes.repository';

const authProviders: Provider[] = [
  AuthService,
  AuthGuard,
  IsParticipantDeletedGuard,
  ParticipantsService,
  ParticipantsRepository,
  AttributesRepository,
];

export default authProviders;
