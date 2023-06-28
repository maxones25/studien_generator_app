import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractEntity } from '../../entities/abstract-entity.entity';
import { ConcreteEntity } from '../../entities/concrete-entity.entity';
import { EntityField } from '../../entities/entity-field.entity';
import { EntityFieldAttribute } from '../../entities/entity-field-attribute.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AbstractEntity,
      ConcreteEntity,
      EntityField,
      EntityFieldAttribute,
    ]),
  ],
  providers: [EntitiesService],
  controllers: [EntitiesController],
})
export class EntitiesModule {}
