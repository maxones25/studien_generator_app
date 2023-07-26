import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from '@entities/entity-field.entity';
import { EntityFieldsController } from './entity-fields.controller';
import entityFieldsProviders from './entity-fields.providers';
import { Entity } from '@entities/entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entity, EntityField])],
  providers: entityFieldsProviders,
  controllers: [EntityFieldsController],
})
export class EntityFieldsModule {}
