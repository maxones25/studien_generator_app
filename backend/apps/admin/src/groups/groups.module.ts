import { Module } from '@nestjs/common';
import { AppointmentsModule } from '@admin/appointments/appointments.module';
import { GroupsDb } from './infrastructure/db';
import { GroupsRepository } from './repositories/groups.repository';
import * as Domain from './domain';
import * as Provider from './providers';
import { ConfigsModule } from '@admin/forms/configs/configs.module';
import { ParticipantsModule } from '@admin/participants/participants/participants.module';
import {
  FormConfigGuard,
  GroupGuard,
  IsGroupDeletedGuard,
  ScheduleGuard,
} from './infrastructure/http';
import { FormsModule } from '@admin/forms/forms/forms.module';

@Module({
  imports: [
    GroupsDb,
    AppointmentsModule,
    ConfigsModule,
    ParticipantsModule,
    FormsModule,
  ],
  providers: [
    GroupGuard,
    FormConfigGuard,
    ScheduleGuard,
    IsGroupDeletedGuard,
    GroupsRepository,
    Provider.GroupsRepositoryProvider,
    Provider.SchedulesRepositoryProvider,
    Provider.FormConfigsRepositoryProvider,
    Provider.CreateGroupUseCaseProvider,
    Provider.ChangeGroupNameUseCaseProvider,
    Provider.DeleteGroupUseCaseProvider,
    Provider.RestoreGroupUseCaseProvider,
    Provider.GetGroupsByStudyUseCaseProvider,
    Provider.GetGroupByIdUseCaseProvider,
    Provider.IsGroupDeletedUseCaseProvider,
    Provider.GetStudyRelatedGroupUseCaseProvider,
    Provider.CreateGroupAppointmentUseCaseProvider,
    Provider.GetGroupAppointmentUseCaseProvider,
    Provider.AddFormConfigUseCaseProvider,
    Provider.ActivateFormConfigUseCaseProvider,
    Provider.DeactivateFormConfigUseCaseProvider,
    Provider.SetFormConfigTimeDependentUseCaseProvider,
    Provider.SetFormConfigTimeIndependentUseCaseProvider,
    Provider.RemoveFormConfigUseCaseProvider,
    Provider.GetFormConfigsUseCaseProvider,
    Provider.GetAvailableFormsByGroupUseCaseProvider,
    Provider.AddScheduleUseCaseProvider,
    Provider.UpdateScheduleUseCaseProvider,
    Provider.GetStudyRelatedFormConfigUseCaseProvider,
    Provider.GetStudyRelatedScheduleUseCaseProvider,
    Provider.RemoveScheduleUseCaseProvider,
  ],
  exports: [
    GroupGuard,
    FormConfigGuard,
    ScheduleGuard,
    IsGroupDeletedGuard,
    Domain.GROUPS_REPOSITORY,
    Domain.SCHEDULES_REPOSITORY,
    Domain.FORM_CONFIGS_REPOSITORY,
    Domain.CREATE_GROUP_USE_CASE,
    Domain.CHANGE_GROUP_NAME_USE_CASE,
    Domain.DELETE_GROUP_USE_CASE,
    Domain.RESTORE_GROUP_USE_CASE,
    Domain.GET_GROUPS_BY_STUDY_USE_CASE,
    Domain.GET_GROUP_BY_ID_USE_CASE,
    Domain.IS_GROUP_DELETED_USE_CASE,
    Domain.GET_STUDY_RELATED_GROUP_USE_CASE,
    Domain.CREATE_GROUP_APPOINTMENT_USE_CASE,
    Domain.GET_GROUP_APPOINTMENTS_USE_CASE,
    Domain.ADD_FORM_CONFIG_USE_CASE,
    Domain.ACTIVATE_FORM_CONFIG_USE_CASE,
    Domain.DEACTIVATE_FORM_CONFIG_USE_CASE,
    Domain.SET_FORM_CONFIG_TIME_DEPENDENT_USE_CASE,
    Domain.SET_FORM_CONFIG_TIME_INDEPENDENT_USE_CASE,
    Domain.REMOVE_FORM_CONFIG_USE_CASE,
    Domain.GET_FORM_CONFIGS_USE_CASE,
    Domain.GET_AVAILABLE_FORMS_BY_GROUP_USE_CASE,
    Domain.ADD_SCHEDULE_USE_CASE,
    Domain.UPDATE_SCHEDULE_USE_CASE,
    Domain.GET_STUDY_RELATED_FORM_CONFIG_USE_CASE,
    Domain.GET_STUDY_RELATED_SCHEDULE_USE_CASE,
    Domain.REMOVE_SCHEDULE_USE_CASE,
  ],
})
export class GroupsModule {}
