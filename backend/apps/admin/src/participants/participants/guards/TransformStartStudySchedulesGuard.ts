import { SchedulesService } from '@admin/forms/configs/services/schedules.service';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class TransformStartStudySchedulesGuard implements CanActivate {
  constructor(
    @Inject(SchedulesService)
    private readonly schedulesService: SchedulesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const participant = request?.participant;

    if (!participant) throw new BadRequestException('participant required');

    const configs = request?.body?.configs;

    if (!configs) throw new BadRequestException('configs required');

    const schedules = await this.schedulesService.getActiveByGroup(
      participant.groupId,
    );

    const updatedSchedules = schedules.map((schedule) => {
      const updateSchedule = configs
        .flatMap((config) => config.schedules)
        .find((s) => s.id === schedule.id);
      if (!updateSchedule)
        throw new InternalServerErrorException('schedule not found');
      return {
        ...schedule,
        times: updateSchedule.times,
      };
    });

    request.body.schedules = updatedSchedules;

    return true;
  }
}
