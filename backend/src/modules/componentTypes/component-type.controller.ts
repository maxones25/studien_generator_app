import { Controller, Get } from '@nestjs/common';
import { ComponentTypesService } from './component-types.service';
import { Types } from '../../decorators/type.decorator';
import { Roles } from '../../decorators/roles.decorator';

@Controller('componentTypes')
export class ComponentTypesController {
  constructor(private readonly componentTypesService: ComponentTypesService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getAll() {
    return this.componentTypesService.getAll();
  }
}
