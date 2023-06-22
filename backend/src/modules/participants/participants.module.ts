import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../../entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [ParticipantsService],
  controllers: [ParticipantsController]
})
export class ParticipantsModule {}
