import { faker } from '@faker-js/faker';
import { FieldType } from '@shared/enums/field-type.enum';
import { FormConfigType } from '@shared/enums/form-config-type.enum';
import datetime from '@shared/modules/datetime/datetime';

const randomEnum = <E>(data: E): E[keyof E] => {
  const values = Object.values(data) as unknown as E[keyof E][];
  const index = Math.floor(Math.random() * values.length);
  return values[index];
};

const randomName = () =>
  faker.string.alphanumeric({ length: { min: 5, max: 10 } });

const director = () => {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password({ length: 12 }),
  };
};

const study = () => {
  return {
    name: randomName(),
  };
};

const group = () => {
  return {
    name: randomName(),
  };
};

const entity = () => {
  return {
    name: randomName(),
  };
};

const entityField = () => {
  return {
    name: randomName(),
    type: randomEnum(FieldType),
  };
};

const participant = (groupId?: string) => {
  const number = faker.string.alpha({ length: 6 });
  if (groupId) {
    return {
      number,
      groupId,
    };
  }
  return {
    number,
  };
};

const form = () => {
  return {
    name: randomName(),
  };
};

const formConfig = (groupId: string) => {
  return {
    isActive: faker.datatype.boolean(),
    type: randomEnum(FormConfigType),
    groupId,
  };
};

const formEntity = (entityId: string) => {
  return {
    name: randomName(),
    entityId,
  };
};

const chatMessageParticipant = (participantId: string, chatId: string) => {
  return {
    id: id(),
    chatId,
    participantId,
    sentAt: new Date(),
    content: faker.word.sample(),
  };
};

const chatMessageAdmin = () => {
  return {
    content: faker.word.sample(),
  };
};

const formatTime = (h: number, m: number) => {
  return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
};

const appointment = () => {
  const date = faker.date.future().toISOString().substring(0, 10);

  const startHours = faker.number.int({ min: 0, max: 22 });
  const startMinutes = faker.number.int({ min: 0, max: 59 });

  const endHours = faker.number.int({ min: startHours + 1, max: 23 });
  const endMinutes = faker.number.int({ min: 0, max: 59 });

  return {
    subject: faker.string.alpha({ length: 12 }),
    startDate: date,
    startTime: formatTime(startHours, startMinutes),
    endDate: date,
    endTime: formatTime(endHours, endMinutes),
  };
};

const task = (options: { isCompleted?: boolean } = {}) => {
  const { isCompleted = false } = options;

  const scheduledAt = faker.date.future();

  const completedAt = isCompleted
    ? datetime.addTime(scheduledAt, {
        hours: 0,
        minutes: faker.number.int({ min: 0, max: 10 }),
      })
    : null;

  return {
    scheduledAt: scheduledAt.toISOString(),
    completedAt: completedAt,
    rescheduled: 0,
  };
};

export const id = () => faker.string.uuid();

const text = (length = 10) => faker.string.alpha({ length, casing: "mixed" });

export const password = (length = 10) =>
  faker.internet.password({ length, memorable: true });

export default {
  id,
  text,
  password,
  name: randomName,
  director,
  study,
  group,
  participant,
  entity,
  entityField,
  form,
  formConfig,
  formEntity,
  chatMessageParticipant,
  chatMessageAdmin,
  appointment,
  task,
};
