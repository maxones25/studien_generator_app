import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from '@entities';
import directorsProviders from './directors.providers';
import { DirectorsService } from './services/directors.service';
import { DirectorGuard } from './guards/director.guard';
import { AuthGuard } from './guards/auth.guard';
import { IsDirectorDeletedGuard } from './guards/IsDirectorDeletedGuard';
import { PasswordModule } from '@shared/modules/password/password.module';
import { LOGIN_ADMIN_USE_CASE } from './domain';
import { LOGIN_DIRECTOR_USE_CASE } from './domain';
import { SIGN_UP_DIRECTOR_USE_CASE } from './domain/useCases/ISignUpDirectorUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Director]), PasswordModule],
  providers: directorsProviders,
  exports: [
    IsDirectorDeletedGuard,
    DirectorGuard,
    AuthGuard,
    DirectorsService,
    SIGN_UP_DIRECTOR_USE_CASE,
    LOGIN_DIRECTOR_USE_CASE,
    LOGIN_ADMIN_USE_CASE,
  ],
})
export class DirectorsModule {}
