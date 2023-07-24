import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['.'],
  testMatch: ['**/shared/unit/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/shared/filters/**/*.ts',
    'src/shared/modules/**/*.ts',
    'src/shared/pipes/**/*.ts',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  coverageDirectory: './coverage/shared/unit',
  coverageReporters: ['lcov'],
  moduleNameMapper: {
    '@admin/(.*)': '<rootDir>/src/apps/admin/$1',
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};

export default config;
