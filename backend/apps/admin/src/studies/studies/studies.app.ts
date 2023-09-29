import { Module } from '@nestjs/common';
import { StudiesQueries } from './api/studies.queries';
import { StudiesModule } from './studies.module';
import { StudiesCommands } from './api/studies.commands';
import { DirectorsModule } from '@admin/directors/directors.module';
import { AppointmentCommands } from './api/appointments.commands';
import { AppointmentQueries } from './api/appointments.queries';

@Module({
  imports: [StudiesModule, DirectorsModule],
  controllers: [
    StudiesCommands,
    StudiesQueries,
    AppointmentCommands,
    AppointmentQueries,
  ],
})
export class StudiesApp {}
