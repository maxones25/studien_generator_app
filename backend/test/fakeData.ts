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

export default {
  director,
  study,
};
