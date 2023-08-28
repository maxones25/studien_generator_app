import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '@entities/participant.entity';
import participantsProviders from './participants.providers';
import { ParticipantGuard } from './guards/participant.guard';
import { ParticipantsService } from './participants.service';
import { ParticipantsRepository } from './participants.repository';
import { TransformStartStudySchedulesGuard } from './guards/TransformStartStudySchedulesGuard';
import { ConfigsModule } from '@admin/forms/configs/configs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Participant]), ConfigsModule],
  providers: participantsProviders,
  exports: [
    ParticipantGuard,
    TransformStartStudySchedulesGuard,
    ParticipantsService,
    ParticipantsRepository,
  ],
})
export class ParticipantsModule {}
