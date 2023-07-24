import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from '@entities/entity-field.entity';
import { EntityFieldsController } from './entity-fields.controller';
import entityFieldsProviders from './entity-fields.providers';

@Module({
  imports: [TypeOrmModule.forFeature([EntityField])],
  providers: entityFieldsProviders,
  controllers: [EntityFieldsController],
})
export class EntityFieldsModule {}
