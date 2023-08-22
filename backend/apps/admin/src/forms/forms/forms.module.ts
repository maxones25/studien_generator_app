import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from '@entities/form.entity';
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
    PageGuard,
    EntityGuard,
    FormsService,
    PagesService,
    EntitiesService,
  ],
})
export class FormsModule {}
