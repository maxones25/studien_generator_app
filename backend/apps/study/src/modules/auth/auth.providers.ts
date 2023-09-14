import { Provider } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { IsParticipantDeletedGuard } from './guards/IsParticipantDeleted.guard';

const authProviders: Provider[] = [
  AuthService,
  AuthGuard,
  IsParticipantDeletedGuard,
];

export default authProviders;
