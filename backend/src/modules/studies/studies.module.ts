import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { Study } from '../../entities/study.entity';
import { StudyMember } from '../../entities/study-member';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Group, Participant } from '@entities';
import { GroupsController } from './groups/groups.controller';
import { ParticipantsController } from './participants/participants.controller';
import { GroupsService } from './groups/groups.service';
import { ParticipantsService } from './participants/participants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyMember, Group, Participant])],
  providers: [
    StudiesService,
    GroupsService,
    ParticipantsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [StudiesController, GroupsController, ParticipantsController],
})
export class StudiesModule {}
