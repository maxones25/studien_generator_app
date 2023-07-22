import { Module } from '@nestjs/common';
import { EntitiesController } from './entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from '../../entities/entity.entity';
import { EntityFieldsModule } from './fields/entity-fields.module';
import entitiesProviders from './entities.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Entity]), EntityFieldsModule],
  providers: entitiesProviders,
  controllers: [EntitiesController],
})
export class EntitiesModule {}
