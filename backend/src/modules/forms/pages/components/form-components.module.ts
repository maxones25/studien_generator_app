import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormComponent } from '../../../../entities/form-component.entity';
import { FormComponentsController } from './form-components.controller';
import { ComponentsModule } from '../../../components/components.module';
import formComponentsProviders from './form-components.providers';

@Module({
  imports: [TypeOrmModule.forFeature([FormComponent]), ComponentsModule],
  controllers: [FormComponentsController],
  providers: formComponentsProviders,
})
export class FormComponentsModule {}
