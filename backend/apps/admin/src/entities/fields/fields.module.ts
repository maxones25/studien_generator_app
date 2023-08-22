import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from '@entities/entity-field.entity';
import entityFieldsProviders from './fields.providers';
import { FieldsService } from './fields.service';
import { FieldGuard } from './field.guard';
import { EntityFieldAttribute } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([EntityField, EntityFieldAttribute])],
  providers: entityFieldsProviders,
  exports: [FieldsService, FieldGuard],
})
export class FieldsModule {}
