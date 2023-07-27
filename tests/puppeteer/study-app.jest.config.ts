import type { Config } from 'jest'

const config: Config = {
  preset: "jest-puppeteer",
  verbose: true,
  globals: {
    BASE_URL: "http://localhost:4000",
  },
  rootDir: '.',
  testMatch: ['<rootDir>/study/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;