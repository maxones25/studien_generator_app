import { Module } from '@nestjs/common';
import { GroupsModule } from './groups.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { FormsModule } from '@admin/forms/forms/forms.module';
import { ConfigsModule } from '@admin/forms/configs/configs.module';

import { AppointmentsQueries } from './api/appointments.queries';
import { AppointmentsCommands } from './api/appointments.commands';
import { FormConfigsCommands } from './api/formConfigs.commands';
import { GroupsCommands } from './api/groups.commands';
import { GroupsQueries } from './api/groups.queries';
import { FormConfigsQueries } from './api/formConfigs.queries';

@Module({
  imports: [GroupsModule, StudiesModule, ConfigsModule, FormsModule],
  controllers: [
    AppointmentsCommands,
    AppointmentsQueries,
    GroupsCommands,
    GroupsQueries,
    FormConfigsCommands,
    FormConfigsQueries,
  ],
})
export class GroupsApp {}
