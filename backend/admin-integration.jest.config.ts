import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['.'],
  testMatch: ['**/admin/integration/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: './coverage/integration',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '@admin/(.*)': '<rootDir>/src/apps/admin/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};

export default config;
