import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from '@entities/director.entity';
import { EntityField } from '@entities/entity-field.entity';
import { FormComponent } from '@entities/form-component.entity';
import { Entity } from '@entities/entity.entity';
import { FormConfiguration } from '@entities/form-configuration.entity';
import { FormEntity } from '@entities/form-entity.entity';
import { FormComponentAttribute } from '@entities/form-component-attribute.entity';
import { FormField } from '@entities/form-field.entity';
import { FormPage } from '@entities/form-page.entity';
import { Form } from '@entities/form.entity';
import { Group } from '@entities/group.entity';
import { ParticipantAttributes } from '@entities/participant-attributes.entity';
import { Participant } from '@entities/participant.entity';
import { RecordField } from '@entities/record-field.entity';
import { Record } from '@entities/record.entity';
import { StudyMember } from '@entities/study-member.entity';
import { Study } from '@entities/study.entity';
import { Task } from '@entities/task.entity';

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
        FormComponentAttribute,
        FormComponent,
        FormConfiguration,
        FormEntity,
        FormField,
        FormPage,
        Form,
        Group,
        ParticipantAttributes,
        Participant,
        RecordField,
        Record,
        StudyMember,
        Study,
        Task,
      ],
    };
  },
});

export default DbModule;
