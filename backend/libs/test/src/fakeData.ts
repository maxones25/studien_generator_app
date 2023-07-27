import { faker } from '@faker-js/faker';
import { FieldType } from '@shared/enums/field-type.enum';
import { FormConfigType } from '@shared/enums/form-config-type.enum';

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

const participant = () => {
  return {
    number: faker.number.int({ min: 100000, max: 999999 }).toString(),
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

export const id = () => faker.string.uuid();

export default {
  id,
  name: randomName,
  director,
  study,
  group,
  participant,
  entity,
  entityField,
  form,
  formConfig,
};
