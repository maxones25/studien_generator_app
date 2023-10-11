import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment, Participant } from '@entities';
import participantsProviders from './participants.providers';
import { ParticipantGuard } from './guards/participant.guard';
import { ParticipantsService } from './participants.service';
import { ParticipantAttribute } from '@entities';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { TasksModule } from '../tasks/tasks.module';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';
import { CreateParticipantTransaction } from './transactions/CreateParticipantTransaction';
import { ResetPasswordUseCase } from './transactions/ResetPasswordUseCase';
import { DeleteParticipantTransaction } from './transactions/DeleteParticipantTransaction';
import { CreateAppointmentUseCase } from './transactions/CreateAppointmentUseCase';
import { GetAppointmentsUseCase } from './transactions/GetAppointmentsUseCase';
import { PasswordModule } from '@shared/modules/password/password.module';
import { ParticipantsRepository } from './participants.repository';
import { GroupsModule } from '@admin/groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participant, ParticipantAttribute, Appointment]),
    PasswordModule,
    StudiesModule,
    TasksModule,
    GroupsModule,
  ],
  providers: participantsProviders,
  exports: [
    ParticipantsRepository,
    ParticipantGuard,
    ParticipantsService,
    StartParticipantStudyTransaction,
    CreateParticipantTransaction,
    DeleteParticipantTransaction,
    ResetPasswordUseCase,
    CreateAppointmentUseCase,
    GetAppointmentsUseCase,
  ],
})
export class ParticipantsModule {}
