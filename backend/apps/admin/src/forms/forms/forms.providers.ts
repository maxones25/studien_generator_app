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

const formsProviders: Provider[] = [
  FormsService,
  PagesService,
  EntitiesService,
  FormsRepository,
  PagesRepository,
  EntitiesRepository,
  CreateFormTransaction,
  DeletePageTransaction,
  FormGuard,
  PageGuard,
  EntityGuard,
];

export default formsProviders;
