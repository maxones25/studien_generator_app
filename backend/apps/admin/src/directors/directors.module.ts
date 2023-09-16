import { Module } from '@nestjs/common';
import { PasswordModule } from '@shared/modules/password';
import * as Domain from './domain';
import * as Provider from './providers';
import * as Guard from '@admin/directors/infrastructure/http';
import * as Db from '@admin/directors/infrastructure/db';

@Module({
  imports: [Db.DirectorsDb, PasswordModule],
  providers: [
    Guard.AuthGuard,
    Guard.DirectorGuard,
    Guard.IsDirectorDeletedGuard,
    Db.DirectorsRepository,
    Provider.DirectorsRepositoryProvider,
    Provider.LoginDirectorProvider,
    Provider.SignUpDirectorProvider,
    Provider.LoginAdminProvider,
    Provider.RestoreDirectorProvider,
    Provider.ChangePasswordProvider,
    Provider.DeleteDirectorProvider,
    Provider.UpdateDirectorProvider,
    Provider.GetDirectorsUseCaseProvider,
    Provider.GetDirectorByIdUseCaseProvider,
    Provider.GetDirectorsNotMemberOfStudyUseCaseProvider,
    Provider.IsDirectorDeletedUseCaseProvider,
  ],
  exports: [
    Guard.IsDirectorDeletedGuard,
    Guard.DirectorGuard,
    Guard.AuthGuard,
    Domain.SIGN_UP_DIRECTOR_USE_CASE,
    Domain.LOGIN_DIRECTOR_USE_CASE,
    Domain.LOGIN_ADMIN_USE_CASE,
    Domain.RESTORE_DIRECTOR_USE_CASE,
    Domain.CHANGE_PASSWORD_USE_CASE,
    Domain.DELETE_DIRECTOR_USE_CASE,
    Domain.UPDATE_DIRECTOR_USE_CASE,
    Domain.GET_DIRECTORS_USE_CASE,
    Domain.GET_DIRECTOR_BY_ID_USE_CASE,
    Domain.GET_DIRECTORS_NOT_MEMBER_OF_STUDY_USE_CASE,
    Domain.IS_DIRECTOR_DELETED_USE_CASE,
  ],
})
export class DirectorsModule {}
