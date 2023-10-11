import { Controller, Get, UseGuards } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { IsDirectorGuard } from '@admin/directors/infrastructure/http/guards/IsDirectorGuard';

@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Get()
  @UseGuards(IsDirectorGuard)
  async getAll() {
    return this.componentsService.getAll();
  }
}
