import { Provider } from '@nestjs/common';
import { FormsService } from './services/forms.service';
import { FormsRepository } from './repositories/forms.repository';
import { CreateFormTransaction } from './transactions/CreateFormTransaction';
import { FormGuard } from './guards/form.guard';
import { PagesService } from './services/page.service';
import { PagesRepository } from './repositories/pages.repository';
import { DeletePageTransaction } from './transactions/DeletePageTransaction';
import { PageGuard } from './guards/page.guard';
import { EntityGuard } from './guards/entity.guard';
import { EntitiesRepository } from './repositories/entities.repository';
import { EntitiesService } from './services/entities.service';
import { AddComponentTransaction } from './transactions/AddComponentTransaction';
import { RemoveComponentTransaction } from './transactions/RemoveComponentTransaction';
import { ComponentsService } from './services/components.service';
import { ComponentsRepository } from './repositories/components.repository';
import { ComponentGuard } from './guards/component.guard';
import { CreateFormUseCase } from './transactions/CreateFormUseCase';
import { FORMS_REPOSITORY } from './domain';

const formsProviders: Provider[] = [
  FormsService,
  PagesService,
  EntitiesService,
  ComponentsService,
  FormsRepository,
  PagesRepository,
  EntitiesRepository,
  ComponentsRepository,
  CreateFormTransaction,
  DeletePageTransaction,
  AddComponentTransaction,
  RemoveComponentTransaction,
  FormGuard,
  PageGuard,
  EntityGuard,
  ComponentGuard,
  {
    provide: 'IFormsRepository',
    useClass: FormsRepository,
  },
  {
    provide: FORMS_REPOSITORY,
    useClass: FormsRepository,
  },
  {
    provide: 'IPagesRepository',
    useClass: PagesRepository,
  },
  CreateFormUseCase,
];

export default formsProviders;
