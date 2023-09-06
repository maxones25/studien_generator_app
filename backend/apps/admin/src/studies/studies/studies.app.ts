import { Module } from '@nestjs/common';
import { StudiesQueries } from './controllers/studies.queries';
import { StudiesModule } from './studies.module';
import { StudiesCommands } from './controllers/studies.commands';
import { DirectorsModule } from '@admin/directors/directors.module';
import { AppointmentCommands } from './controllers/appointments.commands';
import { AppointmentQueries } from './controllers/appointments.queries';

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
