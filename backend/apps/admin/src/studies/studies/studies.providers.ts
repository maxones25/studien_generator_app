import { StudiesService } from './studies.service';
import { Provider } from '@nestjs/common';
import { StudyGuard } from './guards/study.guard';
import { CreateStudyTransaction } from './transactions/create-study.transaction';
import { StudyAttributesRepository } from './repositories/study-attributes.repository';
import { StudiesRepository } from './repositories/studies.repository';
import { IsStudyActiveGuard } from './guards/IsStudyActiveGuard';
import { IsStudyDeletedGuard } from './guards/IsStudyDeletedGuard';
import { CreateAppointmentUseCase } from './transactions/CreateAppointmentUseCase';
import { AppointmentsRepository } from './repositories/appointment.repository';
import { GetAppointmentsUseCase } from './transactions/GetAppointmentsUseCase';

const studiesProviders: Provider[] = [
  StudyGuard,
  IsStudyDeletedGuard,
  IsStudyActiveGuard,
  StudiesService,
  CreateStudyTransaction,
  StudyAttributesRepository,
  StudiesRepository,
  AppointmentsRepository,
  {
    provide: CreateAppointmentUseCase,
    useFactory(appointmentsRepository: AppointmentsRepository) {
      return new CreateAppointmentUseCase(appointmentsRepository);
    },
    inject: [AppointmentsRepository],
  },
  {
    provide: GetAppointmentsUseCase,
    useFactory(appointmentsRepository: AppointmentsRepository) {
      return new GetAppointmentsUseCase(appointmentsRepository);
    },
    inject: [AppointmentsRepository],
  },
];

export default studiesProviders;
