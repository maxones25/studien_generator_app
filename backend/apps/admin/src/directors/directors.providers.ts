import { Provider } from '@nestjs/common';
import { DirectorsService } from './services/directors.service';
import { DirectorsRepository } from './repositories/directors.repository';
import { DirectorGuard } from './guards/director.guard';
import { AuthGuard } from './guards/auth.guard';
import { IsDirectorDeletedGuard } from './guards/IsDirectorDeletedGuard';
import { LoginAdminProvider } from './providers/LoginAdminProvider';
import { DirectorsRepositoryProvider } from './providers/DirectorsRepositoryProvider';
import { LoginDirectorProvider } from './providers/LoginDirectorProvider';
import { SignUpDirectorProvider } from './providers/SignUpDirectorProvider';

const directorsProviders: Provider[] = [
  AuthGuard,
  DirectorGuard,
  IsDirectorDeletedGuard,
  DirectorsService,
  DirectorsRepository,
  DirectorsRepositoryProvider,
  LoginDirectorProvider,
  SignUpDirectorProvider,
  LoginAdminProvider,
];

export default directorsProviders;
