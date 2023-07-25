import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '@entities/participant.entity';
import participantsProviders from './participants.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [ParticipantsController],
  providers: participantsProviders,
})
export class ParticipantsModule {}
