import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from '@entities/entity-field.entity';
import { EntityFieldsController } from './entity-fields.controller';
import entityFieldsProviders from './entity-fields.providers';
import { EntitiesModule } from '@admin/entities/entities.module';

@Module({
  imports: [TypeOrmModule.forFeature([EntityField]), EntitiesModule],
  providers: entityFieldsProviders,
  controllers: [EntityFieldsController],
})
export class EntityFieldsModule {}
