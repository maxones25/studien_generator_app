import { faker } from '@faker-js/faker';

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
    name: faker.company.name()
  };
};

export const group = () => {
  return {
    name: faker.company.name()
  };
};

export const participant = () => {
  return {
    number: faker.number.int({min: 100000, max: 999999}).toString()
  };
};

export default {
  director,
  study,
  group,
  participant,
};
