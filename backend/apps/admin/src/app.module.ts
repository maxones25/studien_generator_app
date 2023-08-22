import { Module } from '@nestjs/common';

import ConfigModule from '@shared/modules/config/config.module';
import DbModule from '@shared/modules/db/db.module';
import JwtModule from '@shared/modules/jwt/jwt.module';

import { RolesModule } from '@admin/roles/roles.module';
import { GroupsModule } from '@admin/groups/groups.module';
import { appProviders } from '@admin/app.providers';
import { ComponentsModule } from '@admin/components/components.module';
import { FormSchedulesModule } from '@admin/groups/schedules/form-schedules.module';
import { FormConfigsModule } from '@admin/formConfigs/form-configs.module';

import { StudiesApp } from '@admin/studies/studies/studies.app';
import { DirectorsApp } from '@admin/directors/directors.app';
import { MembersApp } from '@admin/studies/members/members.app';
import { ParticipantsApp } from '@admin/participants/participants.app';
import { EntitiesApp } from '@admin/entities/entities.app';
import { FormsApp } from '@admin/forms/forms/forms.app';

@Module({
  imports: [
    ConfigModule(['.env.database', '.env.admin']),
    DbModule,
    JwtModule,
    DirectorsApp,
    EntitiesApp,
    RolesModule,
    StudiesApp,
    MembersApp,
    GroupsModule,
    ParticipantsApp,
    ComponentsModule,
    FormsApp,
    FormSchedulesModule,
    FormConfigsModule,
  ],
  providers: appProviders,
})
export class AppModule {}
