import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/admin/auth.module';
import { StudiesModule } from './modules/studies/studies.module';
import { TypesGuard } from './modules/auth/guards/types.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { DirectorsModule } from './modules/directors/directors.module';
import { TypeOrmExceptionFilter } from './exceptionfilter/type-orm-exception.filter';
import { EntitiesModule } from './modules/entities/entities.module';
import { FormsModule } from './modules/forms/forms.module';
import { RecordsModule } from './modules/records/admin/records.module';
import DbModule from './modules/db/db.module';
import JwtModule from './modules/jwt/jwt.module';
import ConfigModule from './modules/config/config.module';
import { ComponentsModule } from './modules/components/components.module';
import { ParticipantsModule } from './modules/participants/participants.module';
import { GroupsModule } from './modules/groups/groups.module';

@Module({
  imports: [
    ConfigModule(['.env.database', '.env.admin']),
    DbModule,
    JwtModule,
    AuthModule,
    DirectorsModule,
    StudiesModule,
    GroupsModule,
    ParticipantsModule,
    EntitiesModule,
    FormsModule,
    ComponentsModule,
    RecordsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TypesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
})
export class AppModule {}
