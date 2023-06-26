import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.test.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@app.module': '<rootDir>/src/app.module.ts',
    '^@modules': '<rootDir>/src/modules',
    '^@entities': '<rootDir>/src/entities',
    '^@enums': '<rootDir>/src/enums',
  },
  testTimeout: 15000,
};

export default config;
