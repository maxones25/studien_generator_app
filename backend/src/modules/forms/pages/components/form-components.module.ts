import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormComponent } from '../../../../entities/form-component.entity';
import { FormComponentsController } from './form-components.controller';
import { FormComponentsService } from './form-components.service';
import { ComponentTypesService } from '../../../componentTypes/component-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormComponent])],
  controllers: [FormComponentsController],
  providers: [ComponentTypesService, FormComponentsService],
})
export class FormComponentsModule {}
