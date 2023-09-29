import type { Config } from '@jest/types';

const config = {
  displayName: 'admin:integration',
  cache: true,
  bail: true,
  rootDir: '../../../../',
  testMatch: ['<rootDir>/apps/admin/test/integration/**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['<rootDir>/apps/admin/src/**/*.ts'],
  coverageDirectory: '<rootDir>/coverage/admin/integration',
  coverageReporters: ['lcov'],
  maxWorkers: '50%',
  workerIdleMemoryLimit: '50%',
  workerThreads: true,
  moduleNameMapper: {
    '@admin/(.*)': '<rootDir>/apps/admin/src/$1',
    '@shared/(.*)': '<rootDir>/libs/shared/src/$1',
    '@entities/(.*)': '<rootDir>/libs/entities/src/$1',
    '@entities': '<rootDir>/libs/entities/src',
    '@test/(.*)': '<rootDir>/libs/test/src/$1',
  },
};

export default config;
