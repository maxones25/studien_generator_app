import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@entities';
import groupsProviders from './groups.providers';
import { GroupGuard } from './guards/group.guard';
import { GroupsService } from './groups.service';
import { IsGroupDeletedGuard } from './guards/IsGroupDeletedGuard';
import { DeleteGroupTransaction } from './transactions/DeleteGroupTransaction';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: groupsProviders,
  exports: [
    GroupGuard,
    IsGroupDeletedGuard,
    GroupsService,
    DeleteGroupTransaction,
  ],
})
export class GroupsModule {}
