import { Provider } from '@nestjs/common';
import { DirectorsService } from './application/services/directors.service';
import { DirectorsRepository } from './infrastructure/db/repositories/directors.repository';
import { DirectorGuard } from './infrastructure/http/guards/director.guard';
import { AuthGuard } from './infrastructure/http/guards/auth.guard';
import { IsDirectorDeletedGuard } from './infrastructure/http/guards/IsDirectorDeletedGuard';
import {
  ChangePasswordProvider,
  DeleteDirectorProvider,
  DirectorsRepositoryProvider,
  LoginAdminProvider,
  LoginDirectorProvider,
  RestoreDirectorProvider,
  SignUpDirectorProvider,
  UpdateDirectorProvider,
  DirectorsServiceProvider,
} from './providers';

const directorsProviders: Provider[] = [
  AuthGuard,
  DirectorGuard,
  IsDirectorDeletedGuard,
  DirectorsRepository,
  DirectorsRepositoryProvider,
  LoginDirectorProvider,
  SignUpDirectorProvider,
  LoginAdminProvider,
  RestoreDirectorProvider,
  ChangePasswordProvider,
  DeleteDirectorProvider,
  UpdateDirectorProvider,
  DirectorsServiceProvider,
];

export default directorsProviders;
