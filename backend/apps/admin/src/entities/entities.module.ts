import { Module } from '@nestjs/common';
import { EntitiesController } from './entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from '@entities/entity.entity';
import entitiesProviders from './entities.providers';
import { EntityGuard } from './entity.guard';
import { EntitiesRepository } from './entities.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: entitiesProviders,
  controllers: [EntitiesController],
  exports: [EntityGuard, EntitiesRepository]
})
export class EntitiesModule {}
