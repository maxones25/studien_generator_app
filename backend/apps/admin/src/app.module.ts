import { Module } from '@nestjs/common';
import { appProviders } from '@admin/app.providers';
import ConfigModule from '@shared/modules/config/config.module';
import DbModule from '@shared/modules/db/db.module';
import TokenModule from '@shared/modules/token/token.module';
import { UseCaseModule } from '@shared/modules/transaction/use-case.module';
import { ComponentsModule } from '@admin/forms/components/components.module';
import { StudiesApp } from '@admin/studies/studies/studies.app';
import { DirectorsApp } from '@admin/directors/directors.app';
import { MembersApp } from '@admin/studies/members/members.app';
import { ParticipantsApp } from '@admin/participants/participants.app';
import { EntitiesApp } from '@admin/entities/entities.app';
import { FormsApp } from '@admin/forms/forms/forms.app';
import { HealthModule } from '@shared/modules/health/health.module';
import { GroupsApp } from '@admin/groups/groups.app';
import { MembersModule } from '@admin/studies/members/members.module';
import { RecordsApp } from '@admin/records/records.app';
import { ChatsApp } from '@admin/chats/chats.app';
import { DirectorsModule } from './directors/directors.module';

@Module({
  imports: [
    ConfigModule.forRoot(['.env.database', '.env.admin']),
    TokenModule.forRoot(),
    DbModule,
    DirectorsModule,
    UseCaseModule,
    MembersModule,
    HealthModule,
    DirectorsApp,
    EntitiesApp,
    StudiesApp,
    MembersApp,
    GroupsApp,
    ParticipantsApp,
    ComponentsModule,
    FormsApp,
    ChatsApp,
    RecordsApp,
  ],
  providers: appProviders,
})
export class AppModule {}
