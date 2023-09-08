import { faker } from "@faker-js/faker";

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

export default {
  study,
  entity,
  entityField,
};
