import { Provider } from '@nestjs/common';
import { FormComponentsService } from './form-components.service';
import { FormComponentGuard } from './guards/form-component.guard';

const formComponentsProviders: Provider[] = [
  FormComponentsService,
  { provide: FormComponentGuard, useClass: FormComponentGuard },
];

export default formComponentsProviders;
