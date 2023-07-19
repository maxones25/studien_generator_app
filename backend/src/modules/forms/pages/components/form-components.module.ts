import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormComponent } from '../../../../entities/form-component.entity';
import { FormComponentsController } from './form-components.controller';
import { FormComponentsService } from './form-components.service';
import { ComponentsModule } from 'src/modules/components/components.module';

@Module({
  imports: [TypeOrmModule.forFeature([FormComponent]), ComponentsModule],
  controllers: [FormComponentsController],
  providers: [FormComponentsService],
})
export class FormComponentsModule {}
