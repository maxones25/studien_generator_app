import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from '@entities/entity.entity';
import entitiesProviders from './entities.providers';
import { EntityGuard } from './entity.guard';
import { EntitiesService } from './entities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: entitiesProviders,
  exports: [EntitiesService, EntityGuard],
})
export class EntitiesModule {}
