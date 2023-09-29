import {
  StudyAttribute,
  StudySchema,
  AppointmentSchema,
} from '@entities/schema';
import { TypeOrmModule } from '@nestjs/typeorm';

export const StudiesDb = TypeOrmModule.forFeature([
  StudySchema,
  StudyAttribute,
  AppointmentSchema,
]);
