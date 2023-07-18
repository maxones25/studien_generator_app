import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from '../../entities/form.entity';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { FormEntitiesService } from './form-entities.service';
import { FormEntity } from '../../entities/form-entity.entity';
import { FormComponent } from '../../entities/form-component.entity';
import { FormPagesController } from './form-pages.controller';
import { FormPage } from '../../entities/form-page.entity';
import { FormPagesService } from './form-pages.service';
import { FormComponentsController } from './form-components.controller';
import { FormComponentsService } from './form-components.service';
import { ComponentTypeService } from './component-type.service';
import { ComponentTypesController } from './component-type.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form, FormEntity, FormComponent, FormPage]),
  ],
  controllers: [
    FormsController,
    FormPagesController,
    FormComponentsController,
    ComponentTypesController,
  ],
  providers: [
    ComponentTypeService,
    FormsService,
    FormEntitiesService,
    FormPagesService,
    FormComponentsService,
  ],
})
export class FormsModule {}
