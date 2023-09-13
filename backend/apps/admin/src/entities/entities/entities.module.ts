import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from '@entities';
import entitiesProviders from './entities.providers';
import { EntityGuard } from './guards/entity.guard';
import { EntitiesService } from './entities.service';
import { CreateEntityUseCase } from './useCases/CreateEntityUseCase';
import { ChangeNameUseCase } from './useCases/ChangeNameUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: entitiesProviders,
  exports: [
    EntitiesService,
    EntityGuard,
    CreateEntityUseCase,
    ChangeNameUseCase,
  ],
})
export class EntitiesModule {}
