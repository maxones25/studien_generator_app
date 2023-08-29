import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '@entities/participant.entity';
import participantsProviders from './participants.providers';
import { ParticipantGuard } from './guards/participant.guard';
import { ParticipantsService } from './participants.service';
import { ConfigsModule } from '@admin/forms/configs/configs.module';
import { ParticipantAttribute } from '@entities';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { TasksModule } from '../tasks/tasks.module';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';
import { CreateParticipantTransaction } from './transactions/CreateParticipantTransaction';
import { ResetPasswordUseCase } from './transactions/ResetPasswordUseCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participant, ParticipantAttribute]),
    ConfigsModule,
    StudiesModule,
    TasksModule,
    ConfigsModule,
  ],
  providers: participantsProviders,
  exports: [
    ParticipantGuard,
    ParticipantsService,
    StartParticipantStudyTransaction,
    CreateParticipantTransaction,
    ResetPasswordUseCase,
  ],
})
export class ParticipantsModule {}
