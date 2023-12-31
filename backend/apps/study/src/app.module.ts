import { Module } from '@nestjs/common';
import ConfigModule from '@shared/modules/config/config.module';
import DbModule from '@shared/modules/db/db.module';
import TokenModule from '@shared/modules/token/token.module';
import { AuthModule } from '@study/modules/auth/auth.module';
import { RecordsModule } from '@study/modules/records/records.module';
import { FormsModule } from '@study/modules/forms/forms.module';
import { PushModule } from './modules/push/push.module';
import { HealthModule } from '@shared/modules/health/health.module';
import { ChatModule } from './modules/chat/chat.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { appProviders } from './app.providers';
import { SchedulingModule } from './modules/scheduling/scheduling.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot(['.env.database', '.env.study']),
    ScheduleModule.forRoot(),
    DbModule,
    TokenModule.forRoot(),
    HealthModule,
    AuthModule,
    FormsModule,
    RecordsModule,
    PushModule,
    ChatModule,
    TaskModule,
    NotificationsModule,
    SchedulingModule,
    AppointmentsModule,
  ],
  providers: appProviders,
})
export class AppModule {}
