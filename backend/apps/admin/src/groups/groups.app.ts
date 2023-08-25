import { Module } from '@nestjs/common';
import { GroupsCommands } from './controllers/groups.commands';
import { GroupsQueries } from './controllers/groups.queries';
import { GroupsModule } from './groups.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';

@Module({
  imports: [GroupsModule, StudiesModule],
  controllers: [GroupsCommands, GroupsQueries],
})
export class GroupsApp {}
