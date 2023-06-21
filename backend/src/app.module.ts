import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from './entities/study.entity';
import { StudiesModule } from './modules/studies/studies.module';
import { Participant } from './entities/participant.entity';
import { AuthModule } from './modules/auth/auth.module';
import { Director } from './entities/director.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { StudyToDirector } from './entities/studyToDirector.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) ?? 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Study, Participant, Director, StudyToDirector],
      synchronize: true,
    }),
    AuthModule,
    StudiesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
