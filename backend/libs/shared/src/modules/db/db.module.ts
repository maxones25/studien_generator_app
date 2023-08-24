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
  EntityFieldAttribute,
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
  ParticipantNotification
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
      timezone: "Z",
      entities: [
        Director,
        Entity,
        EntityField,
        EntityFieldAttribute,
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
      ],
    };
  },
});

export default DbModule;
