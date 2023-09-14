import { Provider } from '@nestjs/common';
import { DirectorsService } from './services/directors.service';
import { DirectorsRepository } from './repositories/directors.repository';
import { DirectorGuard } from './guards/director.guard';
import { AuthGuard } from './guards/auth.guard';
import { PasswordService } from '@shared/modules/password/password.service';
import { IsDirectorDeletedGuard } from './guards/IsDirectorDeletedGuard';
import { LoginDirectorUseCase } from './useCases/LoginDirectorUseCase';
import { SignUpDirectorUseCase } from './useCases/SignUpDirectorUseCase';

const directorsProviders: Provider[] = [
  AuthGuard,
  DirectorGuard,
  IsDirectorDeletedGuard,
  DirectorsService,
  DirectorsRepository,
  PasswordService,
  {
    provide: 'IDirectorsRepository',
    useClass: DirectorsRepository,
  },
  LoginDirectorUseCase, 
  SignUpDirectorUseCase,
];

export default directorsProviders;
