import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { TypeOrmExceptionFilter } from '@shared/filters/exception/type-orm-exception.filter';
import ConfigModule from '@shared/modules/config/config.module';
import DbModule from '@shared/modules/db/db.module';
import JwtModule from '@shared/modules/jwt/jwt.module';

import { AuthModule } from '@study/modules/auth/auth.module';
import { RecordsModule } from '@study/modules/records/records.module';
import { FormsModule } from '@study/modules/forms/forms.module';
import { PushModule } from './modules/push/push.module';
import { HealthModule } from '@shared/modules/health/health.module';
import { ChatModule } from './modules/chat/chat.module';

// TEST

@Module({
  imports: [
    ConfigModule(['.env.database', '.env.study']),
    DbModule,
    JwtModule,
    HealthModule,
    AuthModule,
    FormsModule,
    RecordsModule,
    PushModule,
    ChatModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
})
export class AppModule {}
