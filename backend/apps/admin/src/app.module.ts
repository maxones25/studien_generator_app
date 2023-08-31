import { Module } from '@nestjs/common';

import { appProviders } from '@admin/app.providers';

import ConfigModule from '@shared/modules/config/config.module';
import DbModule from '@shared/modules/db/db.module';
import JwtModule from '@shared/modules/jwt/jwt.module';
import { UseCaseModule } from '@shared/modules/transaction/use-case.module';

import { RolesModule } from '@admin/roles/roles.module';
import { ComponentsModule } from '@admin/components/components.module';

import { StudiesApp } from '@admin/studies/studies/studies.app';
import { DirectorsApp } from '@admin/directors/directors.app';
import { MembersApp } from '@admin/studies/members/members.app';
import { ChatsModule } from './chats/chats.module';
import { ParticipantsApp } from '@admin/participants/participants.app';
import { EntitiesApp } from '@admin/entities/entities.app';
import { FormsApp } from '@admin/forms/forms/forms.app';
import { HealthModule } from '@shared/modules/health/health.module';
import { GroupsApp } from '@admin/groups/groups.app';
import { ConfigsApp } from '@admin/forms/configs/configs.app';
import { MembersModule } from '@admin/studies/members/members.module';
import { RecordsApp } from '@admin/records/records.app';
import { ChatsApp } from '@admin/chats/chats.app';

@Module({
  imports: [
    ConfigModule(['.env.database', '.env.admin']),
    JwtModule,
    DbModule,
    UseCaseModule,
    MembersModule,
    HealthModule,
    RolesModule,
    DirectorsApp,
    EntitiesApp,
    StudiesApp,
    MembersApp,
    GroupsApp,
    ParticipantsApp,
    ComponentsModule,
    FormsApp,
    ConfigsApp,
    ChatsApp,
    RecordsApp,
  ],
  providers: appProviders,
})
export class AppModule {}
