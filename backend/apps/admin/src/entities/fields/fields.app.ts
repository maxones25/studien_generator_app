import { Module } from '@nestjs/common';
import { FieldsModule } from './fields.module';
import { FieldsCommands } from './controllers/fields.commands';
import { FieldsQueries } from './controllers/fields.queries';
import { EntitiesModule } from '../entities/entities.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';

@Module({
  imports: [FieldsModule, EntitiesModule, StudiesModule],
  controllers: [FieldsCommands, FieldsQueries],
})
export class FieldsApp {}
