import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@entities/group.entity';
import { StudyMember } from '@entities/study-member.entity';
import { GroupsController } from './groups.controller';
import groupsProviders from './groups.providers';
import { QueryGroupGuard } from './guards/query-group.guard';
import { GroupsRepository } from './groups.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Group, StudyMember])],
  providers: groupsProviders,
  controllers: [GroupsController],
  exports: [QueryGroupGuard, GroupsRepository],
})
export class GroupsModule {}
