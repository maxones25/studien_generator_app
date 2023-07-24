import { Controller, Get } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { Roles } from '@admin/modules/roles/roles.decorator';

@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Roles('admin', 'employee')
  @Get()
  async getAll() {
    return this.componentsService.getAll();
  }
}
