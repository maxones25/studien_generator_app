import type { Config } from 'jest';

const config: Config = {
  rootDir: '.',
  projects: [
    '<rootDir>/apps/admin/test/integration',
    '<rootDir>/apps/admin/test/unit',
    '<rootDir>/libs/shared/test/unit',
  ],
};

export default config;
