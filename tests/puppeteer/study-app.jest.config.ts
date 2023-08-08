import type { Config } from 'jest'

const config: Config = {
  preset: "jest-puppeteer",
  verbose: true,
  globals: {
    BASE_URL: "http://localhost:4000",
    API_URL: "http://localhost:9000"
  },
  rootDir: '.',
  testMatch: ['<rootDir>/study/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testTimeout: 10000
};

export default config;