import { Module } from '@nestjs/common';
import { FormEntitiesController } from './form-entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from '@entities/form-entity.entity';
import formEntitiesProviders from './form-entities.providers';
import { FormsModule } from '../forms.module';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity]), FormsModule],
  controllers: [FormEntitiesController],
  providers: formEntitiesProviders,
})
export class FormEntitiesModule {}
