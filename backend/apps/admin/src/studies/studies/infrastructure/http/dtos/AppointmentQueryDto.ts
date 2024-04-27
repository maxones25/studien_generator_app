import { IsUUID } from 'class-validator';

export class AppointmentQueryDto {
  @IsUUID()
  readonly appointmentId: string;
}
