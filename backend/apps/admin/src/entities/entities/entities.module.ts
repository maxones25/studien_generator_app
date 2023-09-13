import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from '@entities';
import entitiesProviders from './entities.providers';
import { EntityGuard } from './guards/entity.guard';
import { EntitiesService } from './entities.service';
import { CreateEntityUseCase } from './useCases/CreateEntityUseCase';
import { ChangeNameUseCase } from './useCases/ChangeNameUseCase';
import { DeleteEntityUseCase } from './useCases/DeleteEntityUseCase';
import { EntitiesRepository } from './repositories/entities.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: entitiesProviders,
  exports: [
    EntitiesRepository,
    EntityGuard,
    EntitiesService,
    CreateEntityUseCase,
    ChangeNameUseCase,
    DeleteEntityUseCase,
  ],
})
export class EntitiesModule {}
