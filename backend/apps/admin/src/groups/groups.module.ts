import { Module } from '@nestjs/common';
import { GroupsService } from './application/groups.service';
import { AppointmentsModule } from '@admin/appointments/appointments.module';
import { GroupsDb } from './infrastructure/db';
import { GroupsRepository } from './repositories/groups.repository';
import {
  CHANGE_GROUP_NAME_USE_CASE,
  CREATE_GROUP_APPOINTMENT_USE_CASE,
  CREATE_GROUP_USE_CASE,
  DELETE_GROUP_USE_CASE,
  GET_GROUPS_BY_STUDY_USE_CASE,
  GET_GROUP_APPOINTMENTS_USE_CASE,
  GET_GROUP_BY_ID_USE_CASE,
  GET_STUDY_RELATED_GROUP_USE_CASE,
  GROUPS_REPOSITORY,
  IS_GROUP_DELETED_USE_CASE,
  RESTORE_GROUP_USE_CASE,
} from './domain';
import {
  ChangeGroupNameUseCaseProvider,
  CreateGroupAppointmentUseCaseProvider,
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
import { GetGroupAppointmentUseCaseProvider } from './providers/useCases/appointments/GetGroupAppointmentUseCaseProvider';

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
    CreateGroupAppointmentUseCaseProvider,
    GetGroupAppointmentUseCaseProvider,
  ],
  exports: [
    GroupGuard,
    IsGroupDeletedGuard,
    GroupsService,
    GROUPS_REPOSITORY,
    CREATE_GROUP_USE_CASE,
    CHANGE_GROUP_NAME_USE_CASE,
    DELETE_GROUP_USE_CASE,
    RESTORE_GROUP_USE_CASE,
    GET_GROUPS_BY_STUDY_USE_CASE,
    GET_GROUP_BY_ID_USE_CASE,
    IS_GROUP_DELETED_USE_CASE,
    GET_STUDY_RELATED_GROUP_USE_CASE,
    CREATE_GROUP_APPOINTMENT_USE_CASE,
    GET_GROUP_APPOINTMENTS_USE_CASE,
  ],
})
export class GroupsModule {}
