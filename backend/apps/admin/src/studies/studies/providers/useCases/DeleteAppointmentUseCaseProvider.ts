import { Provider } from '@nestjs/common';
import {
  STUDY_APPOINTMENTS_REPOSITORY,
  IStudyAppointmentsRepository,
} from '../../domain';
import { DeleteAppointmentUseCase } from '../../application/useCases/DeleteAppointmentUseCase';

export const DeleteAppointmentUseCaseProvider: Provider = {
  provide: DeleteAppointmentUseCase,
  useFactory(appointmentsRepository: IStudyAppointmentsRepository) {
    return new DeleteAppointmentUseCase(appointmentsRepository);
  },
  inject: [STUDY_APPOINTMENTS_REPOSITORY],
};
