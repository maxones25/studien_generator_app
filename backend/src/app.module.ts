import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from './entities/study.entity';
import { StudiesModule } from './modules/studies/studies.module';
import { Participant } from './entities/participant.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'studien_generator_app',
      entities: [Study, Participant],
      synchronize: false,
    }),
    AuthModule,
    StudiesModule,
  ],
})
export class AppModule {}
