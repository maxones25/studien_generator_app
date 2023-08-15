import { Module } from '@nestjs/common';

import ConfigModule from '@shared/modules/config/config.module';
import DbModule from '@shared/modules/db/db.module';
import JwtModule from '@shared/modules/jwt/jwt.module';

import { RolesModule } from '@admin/roles/roles.module';
import { AuthModule } from '@admin/auth/auth.module';
import { GroupsModule } from '@admin/groups/groups.module';
import { appProviders } from '@admin/app.providers';
import { StudiesModule } from '@admin/studies/studies.module';
import { ComponentsModule } from '@admin/components/components.module';
import { DirectorsModule } from '@admin/directors/directors.module';
import { EntitiesModule } from '@admin/entities/entities.module';
import { ParticipantsModule } from '@admin/participants/participants.module';
import { FormsModule } from '@admin/forms/forms.module';
import { FormEntitiesModule } from '@admin/forms/entities/form-entities.module';
import { FormPagesModule } from '@admin/forms/pages/form-pages.module';
import { FormComponentsModule } from '@admin/forms/pages/components/form-components.module';
import { EntityFieldsModule } from '@admin/entities/fields/entity-fields.module';
import { StudyMembersModule } from '@admin/studies/members/study-members.module';
import { FormSchedulesModule } from '@admin/groups/schedules/form-schedules.module';
import { FormConfigsModule } from '@admin/formConfigs/form-configs.module';

@Module({
  imports: [
    ConfigModule(['.env.database', '.env.admin']),
    DbModule,
    JwtModule,
    AuthModule,
    RolesModule,
    DirectorsModule,
    StudiesModule,
    StudyMembersModule,
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
  ],
  providers: appProviders,
})
export class AppModule {}
