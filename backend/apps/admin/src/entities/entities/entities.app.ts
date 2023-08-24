import { Module } from '@nestjs/common';
import { EntitiesModule } from './entities.module';
import { EntitiesCommands } from './controllers/entities.commands';
import { EntitiesQueries } from './controllers/entities.queries';
import { StudiesModule } from '@admin/studies/studies/studies.module';

@Module({
  imports: [EntitiesModule, StudiesModule],
  controllers: [EntitiesCommands, EntitiesQueries],
})
export class EntitiesApp {}
