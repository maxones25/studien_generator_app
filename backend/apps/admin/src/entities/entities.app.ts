import { Module } from '@nestjs/common';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { EntitiesCommands } from './api/entities.commands';
import { EntitiesModule } from './entities.module';
import { EntitiesQueries } from './api/entities.queries';
import { FieldsCommands } from './api/fields.commands';
import { FieldsQueries } from './api/fields.queries';

@Module({
  imports: [EntitiesModule, StudiesModule],
  controllers: [
    EntitiesCommands,
    EntitiesQueries,
    FieldsCommands,
    FieldsQueries,
  ],
})
export class EntitiesApp {}
