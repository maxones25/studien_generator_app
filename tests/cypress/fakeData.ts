import { faker } from "@faker-js/faker";

export type FakeStudy = {
  name: string;
};

const study = (): FakeStudy => {
  return {
    name: faker.string.alpha({ length: 12 }),
  };
};

export default {
  study,
};
