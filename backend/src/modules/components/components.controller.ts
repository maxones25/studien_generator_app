import { Controller, Get } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { Types } from '../../decorators/type.decorator';
import { Roles } from '../../decorators/roles.decorator';

@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getAll() {
    return this.componentsService.getAll();
  }
}
