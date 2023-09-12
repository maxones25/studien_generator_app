import { NumberColorFormat, faker } from "@faker-js/faker";

export const FieldTypeMap = {
  DateTime: "DateTime",
  Time: "Time",
  Date: "Date",
  Text: "Text",
  Number: "Number",
  Boolean: "Boolean",
} as const;

export type FieldType = (typeof FieldTypeMap)[keyof typeof FieldTypeMap];

export type FakeStudy = {
  name: string;
};

const study = (): FakeStudy => {
  return {
    name: faker.string.alpha({ length: 12 }),
  };
};

export type FakeEntity = {
  name: string;
};

const entity = (): FakeEntity => {
  return {
    name: faker.string.alpha({ length: 12 }),
  };
};

export type FakeEntityField = {
  name: string;
  type: FieldType;
};

const entityField = (type: FieldType): FakeEntityField => {
  return {
    name: faker.string.alpha({ length: 12 }),
    type,
  };
};

export type FakeGroup = {
  name: string;
};

const group = (): FakeGroup => {
  return {
    name: faker.string.alpha({ length: 12 }),
  };
};

export type FakeParticipant = {
  number: string;
};

const participant = (): FakeParticipant => {
  return {
    number: faker.string.numeric({ length: 5 }),
  };
};

export type FakeAppointment = {
  subject: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
};

const formatTime = (h: number, m: number) => {
  return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
};

const appointment = (): FakeAppointment => {
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

export default {
  study,
  group,
  entity,
  entityField,
  appointment,
  participant,
};
