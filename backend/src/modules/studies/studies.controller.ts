import { Controller, Get } from '@nestjs/common';
import { StudiesService } from './studies.service';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Get()
  async findAll() {
    return this.studiesService.findAll();
  }
}
