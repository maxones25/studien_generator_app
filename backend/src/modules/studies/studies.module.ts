import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { Study } from '../../entities/study.entity';
import { Group } from '../../entities/group.entity';
import { Participant } from '../../entities/participant.entity';
import { StudyMember } from '../../entities/study-member';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ParticipantsController } from '../participants/participants.controller';
import { ParticipantsService } from '../participants/participants.service';
import { PasswordService } from '../auth/password.service';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Study, StudyMember, Group, Participant]),
    GroupsModule,
  ],
  providers: [
    StudiesService,
    ParticipantsService,
    PasswordService,
    MembersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [
    StudiesController,
    ParticipantsController,
    MembersController,
  ],
})
export class StudiesModule {}
