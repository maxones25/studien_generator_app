import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: '../../../../',
  testMatch: ['<rootDir>/apps/study/test/integration/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['<rootDir>/apps/study/src/**/*.ts'],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  coverageDirectory: '<rootDir>/coverage/study/integration',
  coverageReporters: ['lcov'],
  moduleNameMapper: {
    '@study/(.*)': '<rootDir>/apps/study/src/$1',
    '@admin/(.*)': '<rootDir>/apps/admin/src/$1',
    '@shared/(.*)': '<rootDir>/libs/shared/src/$1',
    '@entities/(.*)': '<rootDir>/libs/entities/src/$1',
    '@entities': '<rootDir>/libs/entities/src',
    '@test/(.*)': '<rootDir>/libs/test/src/$1',
  },
};

export default config;
