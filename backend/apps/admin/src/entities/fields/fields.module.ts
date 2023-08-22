import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from '@entities/entity-field.entity';
import entityFieldsProviders from './fields.providers';
import { EntitiesModule } from '../entities/entities.module';

@Module({
  imports: [TypeOrmModule.forFeature([EntityField]), EntitiesModule],
  providers: entityFieldsProviders,
})
export class FieldsModule {}
