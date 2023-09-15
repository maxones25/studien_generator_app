import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from '@entities';
import directorsProviders from './directors.providers';
import { DirectorsService } from './application/services/directors.service';
import { DirectorGuard } from './infrastructure/http/guards/director.guard';
import { AuthGuard } from './infrastructure/http/guards/auth.guard';
import { IsDirectorDeletedGuard } from './infrastructure/http/guards/IsDirectorDeletedGuard';
import { PasswordModule } from '@shared/modules/password';
import {
  CHANGE_PASSWORD_USE_CASE,
  DELETE_DIRECTOR_USE_CASE,
  LOGIN_ADMIN_USE_CASE,
  RESTORE_DIRECTOR_USE_CASE,
  LOGIN_DIRECTOR_USE_CASE,
  SIGN_UP_DIRECTOR_USE_CASE,
  UPDATE_DIRECTOR_USE_CASE,
  DIRECTORS_SERVICE,
} from './domain';

@Module({
  imports: [TypeOrmModule.forFeature([Director]), PasswordModule],
  providers: directorsProviders,
  exports: [
    IsDirectorDeletedGuard,
    DirectorGuard,
    AuthGuard,
    DIRECTORS_SERVICE,
    SIGN_UP_DIRECTOR_USE_CASE,
    LOGIN_DIRECTOR_USE_CASE,
    LOGIN_ADMIN_USE_CASE,
    RESTORE_DIRECTOR_USE_CASE,
    CHANGE_PASSWORD_USE_CASE,
    DELETE_DIRECTOR_USE_CASE,
    UPDATE_DIRECTOR_USE_CASE,
  ],
})
export class DirectorsModule {}
