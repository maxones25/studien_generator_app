import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '@entities/participant.entity';
import participantsProviders from './participants.providers';
import { ParticipantGuard } from './participant.guard';
import { ParticipantsService } from './participants.service';
import { ParticipantsRepository } from './participants.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: participantsProviders,
  exports: [ParticipantsService, ParticipantGuard, ParticipantsRepository],
})
export class ParticipantsModule {}
