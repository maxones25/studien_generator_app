import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/study/auth.module';
import { TypesGuard } from './modules/auth/guards/types.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmExceptionFilter } from './exceptionfilter/type-orm-exception.filter';
import { FormsModule } from './modules/forms/study/forms.module';
import { RecordsModule } from './modules/records/study/records.module';
import ConfigModule from '@shared/modules/config/config.module';
import DbModule from '@shared/modules/db/db.module';
import JwtModule from '@shared/modules/jwt/jwt.module';



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
