import { Module } from '@nestjs/common';
import {
  CreateAppointmentUseCase,
  CreateStudyTransaction,
  GetAppointmentsUseCase,
  StudiesService,
} from './application';
import { StudyGuard } from './infrastructure/http/guards/study.guard';
import { IsStudyActiveGuard, IsStudyDeletedGuard } from './infrastructure/http';
import * as Provider from './providers';
import * as Domain from './domain';
import {
  StudiesDb,
  StudiesRepository,
  StudyAttributesRepository,
} from './infrastructure/db';
import { DeleteAppointmentUseCase } from './application/useCases/DeleteAppointmentUseCase';

@Module({
  imports: [StudiesDb],
  providers: [
    StudyGuard,
    IsStudyDeletedGuard,
    IsStudyActiveGuard,
    StudiesService,
    CreateStudyTransaction,
    StudyAttributesRepository,
    StudiesRepository,
    Provider.StudyAppointmentRepositoryProvider,
    Provider.GetStudyAppointmentsUseCaseProvider,
    Provider.CreateStudyAppointmentUseCaseProvider,
    Provider.DeleteAppointmentUseCaseProvider,
  ],
  exports: [
    Domain.STUDY_APPOINTMENTS_REPOSITORY,
    StudiesService,
    StudyGuard,
    IsStudyActiveGuard,
    IsStudyDeletedGuard,
    CreateAppointmentUseCase,
    DeleteAppointmentUseCase,
    GetAppointmentsUseCase,
  ],
})
export class StudiesModule {}
