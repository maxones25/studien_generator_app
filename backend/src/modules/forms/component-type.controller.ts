import { Controller, Get } from '@nestjs/common';
import { ComponentTypeService } from './component-type.service';
import { Types } from 'src/decorators/type.decorator';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('componentTypes')
export class ComponentTypesController {
  constructor(private readonly componentTypesService: ComponentTypeService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getAll() {
    return this.componentTypesService.getAll();
  }
}
