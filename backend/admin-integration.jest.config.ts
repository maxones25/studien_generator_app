import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['.'],
  testMatch: ['**/admin/integration/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globalSetup: "<rootDir>/test/admin/integration/setup.ts",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: '../coverage/unit',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};

export default config;
