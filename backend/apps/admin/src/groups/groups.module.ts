import { Module } from '@nestjs/common';
import { GroupsService } from './application/groups.service';
import { AppointmentsModule } from '@admin/appointments/appointments.module';
import { GroupsDb } from './infrastructure/db';
import {
  CreateAppointmentUseCase,
  GetAppointmentsUseCase,
} from './application';
import { GroupsRepository } from './repositories/groups.repository';
import { AppointmentsRepository } from '@admin/appointments/appointment.repository';
import {
  CHANGE_GROUP_NAME_USE_CASE,
  CREATE_GROUP_USE_CASE,
  DELETE_GROUP_USE_CASE,
  GET_GROUPS_BY_STUDY_USE_CASE,
  GET_GROUP_BY_ID_USE_CASE,
  GET_STUDY_RELATED_GROUP_USE_CASE,
  GROUPS_REPOSITORY,
  IS_GROUP_DELETED_USE_CASE,
  RESTORE_GROUP_USE_CASE,
} from './domain';
import {
  ChangeGroupNameUseCaseProvider,
  CreateGroupUseCaseProvider,
  DeleteGroupUseCaseProvider,
  GetGroupByIdUseCaseProvider,
  GetGroupsByStudyUseCaseProvider,
  GetStudyRelatedGroupUseCaseProvider,
  GroupsRepositoryProvider,
  IsGroupDeletedUseCaseProvider,
  RestoreGroupUseCaseProvider,
} from './providers';
import { ConfigsModule } from '@admin/forms/configs/configs.module';
import { ParticipantsModule } from '@admin/participants/participants/participants.module';
import { GroupGuard, IsGroupDeletedGuard } from './infrastructure/http';

@Module({
  imports: [GroupsDb, AppointmentsModule, ConfigsModule, ParticipantsModule],
  providers: [
    GroupGuard,
    IsGroupDeletedGuard,
    GroupsService,
    GroupsRepository,
    GroupsRepositoryProvider,
    CreateGroupUseCaseProvider,
    ChangeGroupNameUseCaseProvider,
    DeleteGroupUseCaseProvider,
    RestoreGroupUseCaseProvider,
    GetGroupsByStudyUseCaseProvider,
    GetGroupByIdUseCaseProvider,
    IsGroupDeletedUseCaseProvider,
    GetStudyRelatedGroupUseCaseProvider,
    {
      provide: GetAppointmentsUseCase,
      useFactory(appointmentsRepository: AppointmentsRepository) {
        return new GetAppointmentsUseCase(appointmentsRepository);
      },
      inject: [AppointmentsRepository],
    },
    {
      provide: CreateAppointmentUseCase,
      useFactory(appointmentsRepository: AppointmentsRepository) {
        return new CreateAppointmentUseCase(appointmentsRepository);
      },
      inject: [AppointmentsRepository],
    },
  ],
  exports: [
    GroupGuard,
    IsGroupDeletedGuard,
    GroupsService,
    GetAppointmentsUseCase,
    CreateAppointmentUseCase,
    GROUPS_REPOSITORY,
    CREATE_GROUP_USE_CASE,
    CHANGE_GROUP_NAME_USE_CASE,
    DELETE_GROUP_USE_CASE,
    RESTORE_GROUP_USE_CASE,
    GET_GROUPS_BY_STUDY_USE_CASE,
    GET_GROUP_BY_ID_USE_CASE,
    IS_GROUP_DELETED_USE_CASE,
    GET_STUDY_RELATED_GROUP_USE_CASE,
  ],
})
export class GroupsModule {}
