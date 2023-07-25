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

@Module({
  imports: [
    ConfigModule(['.env.database', '.env.admin']),
    DbModule,
    JwtModule,
    AuthModule,
    RolesModule,
    DirectorsModule,
    StudiesModule,
    GroupsModule,
    ParticipantsModule,
    ComponentsModule,
    EntitiesModule,
    FormsModule,
  ],
  providers: appProviders,
})
export class AppModule {}
