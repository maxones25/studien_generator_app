import { Provider } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsRepository } from './participants.repository';
import { ParticipantGuard } from './guards/participant.guard';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';
import { CreateParticipantTransaction } from './transactions/CreateParticipantTransaction';
import { AppUriGenerator } from './services/AppUriGenerator';
import { AttributesRepository } from './attributes.repository';
import { SchedulesTransformer } from './services/SchedulesTransformer';
import { ResetPasswordUseCase } from './transactions/ResetPasswordUseCase';
import { DeleteParticipantTransaction } from './transactions/DeleteParticipantTransaction';
import { CreateAppointmentUseCase } from './transactions/CreateAppointmentUseCase';
import { AppointmentsRepository } from '@admin/appointments/appointment.repository';
import { GetAppointmentsUseCase } from './transactions/GetAppointmentsUseCase';

const participantsProviders: Provider[] = [
  ParticipantGuard,
  ParticipantsService,
  StartParticipantStudyTransaction,
  CreateParticipantTransaction,
  DeleteParticipantTransaction,
  ResetPasswordUseCase,
  AttributesRepository,
  ParticipantsRepository,
  AppUriGenerator,
  SchedulesTransformer,
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

export default participantsProviders;
