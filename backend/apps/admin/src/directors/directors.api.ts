import { Module } from '@nestjs/common';
import { DirectorsCommands } from './infrastructure/http/controllers/directors.commands';
import { DirectorsModule } from './directors.module';
import { AuthCommands } from './infrastructure/http/controllers/auth.commands';
import { DirectorsQueries } from './infrastructure/http/controllers/directors.queries';
import { LoginAdminProvider } from './providers/useCases/LoginAdminProvider';
import { LoginDirectorProvider } from './providers/useCases/LoginDirectorProvider';
import { SignUpDirectorProvider } from './providers/useCases/SignUpDirectorProvider';
import { DirectorsService } from './application';

@Module({
  imports: [DirectorsModule],
  controllers: [DirectorsCommands, AuthCommands, DirectorsQueries],
  providers: [
    LoginAdminProvider,
    LoginDirectorProvider,
    SignUpDirectorProvider,
    DirectorsService,
  ],
})
export class DirectorsApi {}
