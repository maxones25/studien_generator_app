import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: 'admin:integration',
  rootDir: '../../../../',
  testMatch: ['<rootDir>/apps/admin/test/integration/**/*.test.ts'],
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['<rootDir>/apps/admin/src/**/*.ts'],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  coverageDirectory: '<rootDir>/coverage/admin/integration',
  coverageReporters: ['lcov'],
  moduleNameMapper: {
    '@admin/(.*)': '<rootDir>/apps/admin/src/$1',
    '@shared/(.*)': '<rootDir>/libs/shared/src/$1',
    '@entities/(.*)': '<rootDir>/libs/entities/src/$1',
    '@entities': '<rootDir>/libs/entities/src',
    '@test/(.*)': '<rootDir>/libs/test/src/$1',
  },
  testTimeout: 8000,
  maxWorkers: '50%',
  verbose: false,
  reporters: [
    'default',
    [
      'jest-slow-test-reporter',
      { numTests: 8, warnOnSlowerThan: 300, color: true },
    ],
  ],
};

export default config;
