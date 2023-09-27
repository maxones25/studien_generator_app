import {
  AppointmentSchema,
  FormConfiguration as FormConfigurationSchema,
  FormSchedule as FormScheduleSchema,
  FormScheduleAttribute as FormScheduleAttributeSchema,
  GroupSchema,
} from '@entities/schema';
import { TypeOrmModule } from '@nestjs/typeorm';

export const GroupsDb = TypeOrmModule.forFeature([
  GroupSchema,
  AppointmentSchema,
  FormConfigurationSchema,
  FormScheduleSchema,
  FormScheduleAttributeSchema,
]);
