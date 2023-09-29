import { Provider } from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../application/useCases/CreateAppointmentUseCase';
import {
  STUDY_APPOINTMENTS_REPOSITORY,
  IStudyAppointmentsRepository,
} from '../../domain';

export const CreateStudyAppointmentUseCaseProvider: Provider = {
  provide: CreateAppointmentUseCase,
  useFactory(appointmentsRepository: IStudyAppointmentsRepository) {
    return new CreateAppointmentUseCase(appointmentsRepository);
  },
  inject: [STUDY_APPOINTMENTS_REPOSITORY],
};
