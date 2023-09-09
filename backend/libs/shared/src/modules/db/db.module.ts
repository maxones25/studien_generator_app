import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from "typeorm-transactional";
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
  ParticipantAttribute,
  FormComponent,
  FormConfiguration,
  FormComponentAttribute,
  FormField,
  RecordField,
  Record,
  Task,
  FormSchedule,
  FormScheduleAttribute,
  Chat,
  ChatMessage,
  ChatMessageReceipt,
  ParticipantNotification,
  Appointment,
} from '@entities';
import { DataSource } from 'typeorm';

const DbModule = TypeOrmModule.forRootAsync({
  useFactory: async () => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: 'Z',
      logging: false,
      entities: [
        Director,
        Entity,
        EntityField,
        FormComponent,
        FormComponentAttribute,
        FormConfiguration,
        FormEntity,
        FormField,
        FormPage,
        Form,
        Group,
        Participant,
        ParticipantAttribute,
        RecordField,
        Record,
        StudyMember,
        Study,
        StudyAttribute,
        Task,
        FormSchedule,
        FormScheduleAttribute,
        Chat,
        ChatMessage,
        ChatMessageReceipt,
        ParticipantNotification,
        Appointment,
      ],
    };
  },
  async dataSourceFactory(options) {
    if (!options) {
      throw new Error('Invalid options passed');
    }

    return addTransactionalDataSource(new DataSource(options));
  },
});

export default DbModule;
