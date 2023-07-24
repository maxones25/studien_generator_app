import { Module } from '@nestjs/common';

import ConfigModule from '@shared/modules/config/config.module';
import DbModule from '@shared/modules/db/db.module';
import JwtModule from '@shared/modules/jwt/jwt.module';

import { RolesModule } from '@admin/modules/roles/roles.module';
import { AuthModule } from '@admin/modules/auth/auth.module';
import { GroupsModule } from '@admin/modules/groups/groups.module';
import { appProviders } from '@admin/app.providers';
import { StudiesModule } from '@admin/modules/studies/studies.module';
import { ComponentsModule } from '@admin/modules/components/components.module';
import { DirectorsModule } from '@admin/modules/directors/directors.module';
import { EntitiesModule } from '@admin/modules/entities/entities.module';

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
    ComponentsModule,
    EntitiesModule,
  ],
  providers: appProviders,
})
export class AppModule {}
