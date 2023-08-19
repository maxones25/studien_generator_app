import { Module } from '@nestjs/common';
import { ParticipantsQueries } from './controllers/participants.queries';
import { ParticipantsCommands } from './controllers/participants.commands';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '@entities/participant.entity';
import participantsProviders from './participants.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [ParticipantsQueries, ParticipantsCommands],
  providers: participantsProviders,
})
export class ParticipantsModule {}
