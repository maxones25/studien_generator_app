import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FormSchedulesRepository } from './form-schedules.repository';

@Injectable()
export class FormScheduleGuard implements CanActivate {
  constructor(
    @Inject(FormSchedulesRepository)
    private formSchedulesRepository: FormSchedulesRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const scheduleId = request.params.scheduleId;

    if (!scheduleId) return true;

    const schedule = await this.formSchedulesRepository.findOne({
      where: { id: scheduleId, configId: formId },
    });

    if (!schedule) throw new UnauthorizedException();

    return true;
  }
}
