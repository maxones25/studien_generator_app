import {
  AppointmentSchema,
  FormConfiguration as FormConfigurationSchema,
  GroupSchema,
} from '@entities/schema';
import { TypeOrmModule } from '@nestjs/typeorm';

export const GroupsDb = TypeOrmModule.forFeature([
  GroupSchema,
  AppointmentSchema,
  FormConfigurationSchema,
]);
