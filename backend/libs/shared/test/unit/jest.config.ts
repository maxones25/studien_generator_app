import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: "../../../../",
  testMatch: ['<rootDir>/libs/shared/test/unit/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '<rootDir>/libs/shared/src/**/*.ts',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/libs/shared/src/enums',
    '<rootDir>/libs/shared/src/modules/db',
    '<rootDir>/libs/shared/src/modules/config',
    '<rootDir>/libs/shared/src/modules/jwt',
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
    '@admin/(.*)': '<rootDir>/apps/admin/src/$1',
    '@shared/(.*)': '<rootDir>/libs/shared/src/$1',
    '@entities/(.*)': '<rootDir>/libs/entities/src/$1',
    '@test/(.*)': '<rootDir>/libs/test/src/$1',
  },
};

export default config;
