import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormComponent } from '@entities/form-component.entity';
import { FormComponentsController } from './form-components.controller';
import formComponentsProviders from './form-components.providers';
import { ComponentsModule } from '@admin/components/components.module';

@Module({
  imports: [TypeOrmModule.forFeature([FormComponent]), ComponentsModule],
  controllers: [FormComponentsController],
  providers: formComponentsProviders,
})
export class FormComponentsModule {}
