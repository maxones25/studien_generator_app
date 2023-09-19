import { Module } from '@nestjs/common';
import { GroupsCommands } from './api/groups.commands';
import { GroupsQueries } from './api/groups.queries';
import { GroupsModule } from './groups.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { AppointmentsQueries } from './api/appointments.queries';
import { AppointmentsCommands } from './api/appointments.commands';
import { FormConfigsCommands } from './api/formConfigs.commands';
import { FormsModule } from '@admin/forms/forms/forms.module';
import { ConfigsModule } from '@admin/forms/configs/configs.module';

@Module({
  imports: [GroupsModule, StudiesModule, FormsModule, ConfigsModule],
  controllers: [
    AppointmentsCommands,
    AppointmentsQueries,
    GroupsCommands,
    GroupsQueries,
    FormConfigsCommands,
  ],
})
export class GroupsApp {}
