import { Provider } from '@nestjs/common';
import { PasswordService } from '@shared/modules/password/password.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { IsParticipantDeletedGuard } from './guards/IsParticipantDeleted.guard';

const authProviders: Provider[] = [
  PasswordService,
  AuthService,
  AuthGuard,
  IsParticipantDeletedGuard,
];

export default authProviders;
