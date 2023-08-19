import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Study,
  StudyAttribute,
  StudyMember,
  Director,
  Group,
  Participant,
  Form,
  FormPage,
  Entity,
  EntityField,
  FormEntity,
  ParticipantAttributes,
  FormComponent,
  FormConfiguration,
  FormComponentAttribute,
  FormField,
  RecordField,
  Record,
  Task,
  FormSchedule,
} from '@entities';

const DbModule = TypeOrmModule.forRootAsync({
  useFactory: async () => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Director,
        EntityField,
        Entity,
        FormComponent,
        FormComponentAttribute,
        FormConfiguration,
        FormEntity,
        FormField,
        FormPage,
        Form,
        Group,
        Participant,
        ParticipantAttributes,
        RecordField,
        Record,
        StudyMember,
        Study,
        StudyAttribute,
        Task,
        FormSchedule,
      ],
    };
  },
});

export default DbModule;
