import { Module } from '@nestjs/common';
// import { FieldsApp } from './fields/fields.app';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import {
  EntitiesCommands,
  EntitiesQueries,
} from '@admin/entities/infrastructure/http';
import { EntitiesModule } from './entities.module';

@Module({
  imports: [EntitiesModule, StudiesModule],
  controllers: [EntitiesCommands, EntitiesQueries],
})
export class EntitiesApp {}
