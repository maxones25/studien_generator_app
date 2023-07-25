import { faker } from '@faker-js/faker';

const randomName = () => faker.string.alphanumeric({ length: { min: 5, max: 10 } })

export const director = () => {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password({ length: 12 }),
  };
};

export const study = () => {
  return {
    name: randomName(),
  };
};

export const group = () => {
  return {
    name: randomName(),
  };
};

export const entity = () => {
  return {
    name: randomName(),
  };
};

export const participant = () => {
  return {
    number: faker.number.int({ min: 100000, max: 999999 }).toString(),
  };
};

export const id = () => faker.string.uuid()

export default {
  id,
  director,
  study,
  group,
  participant,
  entity,
};
