import { Controller, Get, Query, Inject, UseGuards } from '@nestjs/common';
import { SchedulesService } from '../services/schedules.service';
import { Roles } from '@admin/roles/roles.decorator';
import { ConfigQueryDto } from '../dtos/ConfigQueryDto';
import { ConfigGuard } from '../guards/config.guard';

@Controller('forms')
export class FormSchedulesController {
  constructor(
    @Inject(SchedulesService)
    private readonly schedulesService: SchedulesService,
  ) {}

  @Get('getByForm')
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  async getAll(@Query() { configId }: ConfigQueryDto) {
    return this.schedulesService.getByConfig(configId);
  }
}
