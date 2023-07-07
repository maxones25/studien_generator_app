import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/admin/auth.module';
import { StudiesModule } from './modules/studies/studies.module';
import { TypesGuard } from './modules/auth/guards/types.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Director } from './entities/director.entity';
import { Study } from './entities/study.entity';
import { StudyMember } from './entities/study-member';
import { Group } from './entities/group.entity';
import { Participant } from './entities/participant.entity';
import { JwtModule } from '@nestjs/jwt';
import { DirectorsModule } from './modules/directors/directors.module';
import { Entity } from './entities/entity.entity';
import { EntityField } from './entities/entity-field.entity';
import { TypeOrmExceptionFilter } from './exceptionfilter/type-orm-exception.filter';
import { EntityFieldAttribute } from './entities/entity-field-attribute.entity';
import { EntitiesModule } from './modules/entities/entities.module';
import { FieldsModule } from './modules/fields/fields.module';
import { Form } from './entities/form.entity';
import { FormsModule } from './modules/forms/forms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.database', '.env.admin'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) ?? 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Director,
        Study,
        StudyMember,
        Group,
        Participant,
        Entity,
        EntityField,
        EntityFieldAttribute,
        Form,
      ],
      logging: false,
      synchronize: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    StudiesModule,
    DirectorsModule,
    EntitiesModule,
    FieldsModule,
    FormsModule,
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
