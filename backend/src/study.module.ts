import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/study/auth.module';
import { TypesGuard } from './modules/auth/guards/types.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmExceptionFilter } from './exceptionfilter/type-orm-exception.filter';
import DbModule from './modules/db/db.module';
import { FormsModule } from './modules/forms/forms.module';
import ConfigModule from './modules/config/config.module';
import { RecordsModule } from './records/records.module';
import JwtModule from './modules/jwt/jwt.module';



@Module({
  imports: [
    ConfigModule(['.env.database', '.env.admin']),
    DbModule,
    JwtModule,
    AuthModule,
    FormsModule,
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
