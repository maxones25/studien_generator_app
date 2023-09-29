import { Provider } from '@nestjs/common';
import {
  STUDY_APPOINTMENTS_REPOSITORY,
  IStudyAppointmentsRepository,
} from '../../domain';
import { GetAppointmentsUseCase } from '../../application';

export const GetStudyAppointmentsUseCaseProvider: Provider = {
  provide: GetAppointmentsUseCase,
  useFactory(studyAppointmentsRepository: IStudyAppointmentsRepository) {
    return new GetAppointmentsUseCase(studyAppointmentsRepository);
  },
  inject: [STUDY_APPOINTMENTS_REPOSITORY],
};
