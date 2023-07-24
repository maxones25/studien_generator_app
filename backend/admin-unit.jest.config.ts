import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['.'],
  testMatch: ['**/admin/unit/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: './coverage/unit',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '@admin/(.*)': '<rootDir>/src/admin/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};

export default config;
