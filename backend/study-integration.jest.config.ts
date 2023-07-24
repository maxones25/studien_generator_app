import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['.'],
  testMatch: ['**/study/integration/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/study/admin/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageDirectory: './coverage/study/integration',
  coverageReporters: ['lcov'],
  moduleNameMapper: {
    '@study/(.*)': '<rootDir>/src/apps/study/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};

export default config;
