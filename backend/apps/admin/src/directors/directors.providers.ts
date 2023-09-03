import { Provider } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorsRepository } from './directors.repository';
import { DirectorGuard } from './guards/director.guard';
import { AuthGuard } from './guards/auth.guard';
import { PasswordService } from '@shared/modules/password/password.service';
import { IsDirectorDeletedGuard } from './guards/IsDirectorDeletedGuard';

const directorsProviders: Provider[] = [
  AuthGuard,
  DirectorGuard,
  IsDirectorDeletedGuard,
  DirectorsService,
  DirectorsRepository,
  PasswordService,
];

export default directorsProviders;
