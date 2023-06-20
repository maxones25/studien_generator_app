import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.studiesService.findAll();
  }
}
