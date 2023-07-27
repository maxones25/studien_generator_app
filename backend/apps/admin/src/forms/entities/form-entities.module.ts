import { Module } from '@nestjs/common';
import { FormEntitiesController } from './form-entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from '@entities/form-entity.entity';
import formEntitiesProviders from './form-entities.providers';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])],
  controllers: [FormEntitiesController],
  providers: formEntitiesProviders,
})
export class FormEntitiesModule {}
