import { Module } from '@nestjs/common';
import { FormEntitiesController } from './form-entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from '@entities/form-entity.entity';
import { FormEntitiesService } from './form-entities.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])],
  controllers: [FormEntitiesController],
  providers: [FormEntitiesService],
})
export class FormEntitiesModule {}
