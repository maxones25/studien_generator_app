import { Module } from '@nestjs/common';
import { FieldsModule } from './fields.module';
import { FieldsCommands } from './controllers/fields.commands';
import { FieldsQueries } from './controllers/fields.queries';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { EntitiesModule } from '../entities.module';

@Module({
  imports: [FieldsModule, EntitiesModule, StudiesModule],
  controllers: [FieldsCommands, FieldsQueries],
})
export class FieldsApp {}
