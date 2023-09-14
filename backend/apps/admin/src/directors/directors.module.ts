import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from '@entities';
import directorsProviders from './directors.providers';
import { DirectorsService } from './services/directors.service';
import { DirectorGuard } from './guards/director.guard';
import { AuthGuard } from './guards/auth.guard';
import { IsDirectorDeletedGuard } from './guards/IsDirectorDeletedGuard';
import { LoginDirectorUseCase } from './useCases/LoginDirectorUseCase';
import { SignUpDirectorUseCase } from './useCases/SignUpDirectorUseCase';
import { PasswordModule } from '@shared/modules/password/password.module';

@Module({
  imports: [TypeOrmModule.forFeature([Director]), PasswordModule],
  providers: directorsProviders,
  exports: [
    IsDirectorDeletedGuard,
    DirectorGuard,
    AuthGuard,
    DirectorsService,
    LoginDirectorUseCase,
    SignUpDirectorUseCase,
  ],
})
export class DirectorsModule {}
