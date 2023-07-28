import { TypeOrmModule } from '@nestjs/typeorm';

import { StudyMember } from '@entities';
import { Study } from '@entities';
import { Director } from '@entities';
import { Group } from '@entities';
import { Participant } from '@entities';
import { Form } from '@entities';
import { FormPage } from '@entities';
import { Entity } from '@entities';
import { EntityField } from '@entities';
import { FormEntity } from '@entities';
import { ParticipantAttributes } from '@entities';
import { FormComponent } from '@entities';
import { FormConfiguration } from '@entities';
import { FormComponentAttribute } from '@entities';
import { FormField } from '@entities';
import { RecordField } from '@entities';
import { Record } from '@entities';
import { Task } from '@entities';
import { FormSchedule } from '@entities';

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
        Task,
        FormSchedule,
      ],
    };
  },
});

export default DbModule;
