import datetime from '@shared/modules/datetime/datetime';
import { CreateAppointmentDto } from '../../infrastructure/http/dtos/CreateAppointmentDto';
import { BadRequestException } from '@nestjs/common';
import {
  IStudyAppointmentsRepository,
  ICreateStudyAppointmentUseCase,
} from '../../domain';
import { EndBeforeStartError } from '@admin/studies/domain';

export type CreateAppointmentInput = {
  studyId: string;
  data: CreateAppointmentDto;
};

export class CreateAppointmentUseCase
  implements ICreateStudyAppointmentUseCase
{
  constructor(
    private readonly appointmentsRepository: IStudyAppointmentsRepository,
  ) {}

  execute({ data, studyId }: CreateAppointmentInput): Promise<string> {
    const start = datetime.convertToDateTime(data.startDate, data.startTime);
    const end = datetime.convertToDateTime(data.endDate, data.endTime);

    if (start.getTime() > end.getTime()) throw new EndBeforeStartError();

    return this.appointmentsRepository.createStudyAppointment(studyId, data);
  }
}
