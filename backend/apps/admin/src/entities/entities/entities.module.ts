import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from '@entities/entity.entity';
import entitiesProviders from './entities.providers';
import { EntityGuard } from './entity.guard';
import { FormsModule } from '@admin/forms/forms.module';
import { EntitiesService } from './entities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity]), FormsModule],
  providers: entitiesProviders,
  exports: [EntityGuard, EntitiesService],
})
export class EntitiesModule {}
