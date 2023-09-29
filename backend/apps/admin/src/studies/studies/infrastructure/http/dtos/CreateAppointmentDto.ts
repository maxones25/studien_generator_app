import { Appointment } from '@entities/core/appointment/Appointment';
import { CreateDto } from '@entities/modules/core/CreateEntityDto';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateAppointmentDto
  implements
    Omit<CreateDto<Appointment>, 'studyId' | 'groupId' | 'participantId'>
{
  @IsDateString()
  startDate: string;

  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Invalid time format. Expected HH:mm',
  })
  startTime: string;

  @IsDateString()
  endDate: string;

  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Invalid time format. Expected HH:mm',
  })
  endTime: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsOptional()
  @IsUUID()
  originId: string;
}
