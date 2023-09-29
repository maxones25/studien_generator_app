import { Provider } from '@nestjs/common';
import { STUDY_APPOINTMENTS_REPOSITORY } from '../../domain';
import { StudyAppointmentsRepository } from '../../infrastructure/db';

export const StudyAppointmentRepositoryProvider: Provider = {
  provide: STUDY_APPOINTMENTS_REPOSITORY,
  useClass: StudyAppointmentsRepository,
};
