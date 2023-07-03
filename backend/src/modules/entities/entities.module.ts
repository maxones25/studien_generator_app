import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from '../../entities/entity.entity';
import { EntityField } from '../../entities/entity-field.entity';
import { EntityFieldAttribute } from '../../entities/entity-field-attribute.entity';
import { FieldsController } from './fields.controller';
import { FieldsService } from './fields.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entity, EntityField, EntityFieldAttribute]),
  ],
  providers: [EntitiesService, FieldsService],
  controllers: [EntitiesController, FieldsController],
})
export class EntitiesModule {}
