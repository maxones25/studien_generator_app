import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../../entities/group.entity';
import { StudyMember } from '../../entities/study-member';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupGuard } from './guards/group.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Group, StudyMember])],
  providers: [
    GroupsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    GroupGuard,
  ],
  controllers: [GroupsController],
})
export class GroupsModule {}
