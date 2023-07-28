import { Controller, Get } from '@nestjs/common';
import { ComponentsService } from './components.service';

@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Get()
  async getAll() {
    return this.componentsService.getAll();
  }
}
