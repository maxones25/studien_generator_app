import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from '@entities';
import entitiesProviders from './entities.providers';
import { EntityGuard } from './entity.guard';
import { EntitiesService } from './entities.service';
import { CreateEntityUseCase } from './useCases/CreateEntityUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: entitiesProviders,
  exports: [EntitiesService, EntityGuard, CreateEntityUseCase],
})
export class EntitiesModule {}
