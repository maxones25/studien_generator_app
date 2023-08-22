import { Module } from '@nestjs/common';
import { FieldsModule } from './fields.module';
import { FieldsCommands } from './controllers/fields.commands';
import { FieldsQueries } from './controllers/fields.queries';

@Module({
  imports: [FieldsModule],
  controllers: [FieldsCommands, FieldsQueries],
})
export class FieldsApp {}
