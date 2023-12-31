import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from '@entities';
import formsProviders from './forms.providers';
import { FormGuard } from './guards/form.guard';
import { FormsService } from './services/forms.service';
import { PagesService } from './services/page.service';
import { PageGuard } from './guards/page.guard';
import {
  FormComponent,
  FormComponentAttribute,
  FormEntity,
  FormPage,
} from '@entities';
import { EntitiesService } from './services/entities.service';
import { EntityGuard } from './guards/entity.guard';
import { ComponentsService } from './services/components.service';
import { ComponentGuard } from './guards/component.guard';
import { CreateFormUseCase } from './transactions/CreateFormUseCase';
import { FORMS_REPOSITORY } from './domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Form,
      FormPage,
      FormEntity,
      FormComponent,
      FormComponentAttribute,
    ]),
  ],
  providers: formsProviders,
  exports: [
    FormGuard,
    EntityGuard,
    PageGuard,
    ComponentGuard,
    CreateFormUseCase,
    FormsService,
    EntitiesService,
    PagesService,
    ComponentsService,
    FORMS_REPOSITORY,
  ],
})
export class FormsModule {}
