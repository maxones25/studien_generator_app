import { Module } from '@nestjs/common';
import { MembersCommands } from './controllers/members.commands';
import { MembersQueries } from './controllers/members.queries';
import { MembersModule } from './members.module';
import { DirectorsModule } from '@admin/directors/directors.module';
import { StudiesModule } from '../studies/studies.module';

@Module({
  imports: [MembersModule, DirectorsModule, StudiesModule],
  controllers: [MembersCommands, MembersQueries],
})
export class MembersApp {}
