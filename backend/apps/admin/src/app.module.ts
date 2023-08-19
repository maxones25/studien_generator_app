import { Module } from '@nestjs/common';

import ConfigModule from '@shared/modules/config/config.module';
import DbModule from '@shared/modules/db/db.module';
import JwtModule from '@shared/modules/jwt/jwt.module';

import { RolesModule } from '@admin/roles/roles.module';
import { AuthModule } from '@admin/auth/auth.module';
import { GroupsModule } from '@admin/groups/groups.module';
import { appProviders } from '@admin/app.providers';
import { ComponentsModule } from '@admin/components/components.module';
import { EntitiesModule } from '@admin/entities/entities.module';
import { ParticipantsModule } from '@admin/participants/participants.module';
import { FormsModule } from '@admin/forms/forms.module';
import { FormEntitiesModule } from '@admin/forms/entities/form-entities.module';
import { FormPagesModule } from '@admin/forms/pages/form-pages.module';
import { FormComponentsModule } from '@admin/forms/pages/components/form-components.module';
import { EntityFieldsModule } from '@admin/entities/fields/entity-fields.module';
import { FormSchedulesModule } from '@admin/groups/schedules/form-schedules.module';
import { FormConfigsModule } from '@admin/formConfigs/form-configs.module';

import { StudiesApp } from '@admin/studies/studies.app';
import { DirectorsApp } from '@admin/directors/directors.app';
import { MembersApp } from '@admin/studies/members/members.app';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule(['.env.database', '.env.admin']),
    DbModule,
    JwtModule,
    AuthModule,
    RolesModule,
    DirectorsApp,
    StudiesApp,
    MembersApp,
    GroupsModule,
    ParticipantsModule,
    ComponentsModule,
    EntitiesModule,
    EntityFieldsModule,
    FormsModule,
    FormEntitiesModule,
    FormPagesModule,
    FormComponentsModule,
    FormSchedulesModule,
    FormConfigsModule,
    ChatsModule,
  ],
  providers: appProviders,
})
export class AppModule {}
