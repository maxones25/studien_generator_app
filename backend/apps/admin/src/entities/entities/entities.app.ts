import { Module } from '@nestjs/common';
import { EntitiesModule } from './entities.module';
import { EntitiesCommands } from './controllers/entities.commands';
import { EntitiesQueries } from './controllers/entities.queries';

@Module({
  imports: [EntitiesModule],
  controllers: [EntitiesCommands, EntitiesQueries],
})
export class EntitiesApp {}
