import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Roles('director', 'participant')
  @Get()
  async findAll() {
    return this.studiesService.findAll();
  }
}
