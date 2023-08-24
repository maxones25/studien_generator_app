import { Module } from '@nestjs/common';
import { StudiesQueries } from './controllers/studies.queries';
import { StudiesModule } from './studies.module';
import { StudiesCommands } from './controllers/studies.commands';
import { DirectorsModule } from '@admin/directors/directors.module';

@Module({
  imports: [StudiesModule, DirectorsModule],
  controllers: [StudiesCommands, StudiesQueries],
})
export class StudiesApp {}
