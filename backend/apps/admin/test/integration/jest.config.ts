import type { Config } from 'jest';

const config: Config = {
  displayName: 'admin',
  rootDir: '../../../../',
  transform: {
    '^.+\\.(t|j)s$': '<rootDir>/create-swc-transformer.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['<rootDir>/apps/admin/test/integration/**/*.test.ts'],
  collectCoverageFrom: ['<rootDir>/apps/admin/src/**/*.ts'],
  coverageDirectory: '<rootDir>/coverage/admin',
  coverageReporters: ['lcov'],
  maxWorkers: '50%',
  moduleNameMapper: {
    '@admin/(.*)': '<rootDir>/apps/admin/src/$1',
    '@shared/(.*)': '<rootDir>/libs/shared/src/$1',
    '@entities/(.*)': '<rootDir>/libs/entities/src/$1',
    '@entities': '<rootDir>/libs/entities/src',
    '@test/(.*)': '<rootDir>/libs/test/src/$1',
  },
  reporters: [
    'default',
    "<rootDir>/test-reporter/index.js"
    // [
    //   './node_modules/jest-html-reporter',
    //   {
    //     pageTitle: 'Test Report',
    //     outputPath: './test-report/report',
    //   },
    // ],
  ],
};

export default config;
