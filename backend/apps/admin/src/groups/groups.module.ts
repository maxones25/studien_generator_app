import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@entities/group.entity';
import groupsProviders from './groups.providers';
import { GroupGuard } from './guards/group.guard';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: groupsProviders,
  exports: [GroupGuard, GroupsService],
})
export class GroupsModule {}
