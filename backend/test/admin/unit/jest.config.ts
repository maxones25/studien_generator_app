import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['.'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: '../coverage/unit',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

export default config;
