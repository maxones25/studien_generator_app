import { Module } from '@nestjs/common';
// import { FieldsApp } from './fields/fields.app';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { EntitiesCommands } from './api/entities.commands';
import { EntitiesModule } from './entities.module';
import { EntitiesQueries } from './api/entities.queries';

@Module({
  imports: [EntitiesModule, StudiesModule],
  controllers: [EntitiesCommands, EntitiesQueries],
})
export class EntitiesApp {}
