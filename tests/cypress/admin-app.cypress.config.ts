import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      apiUrl: "http://localhost:8000",
    },
    video: false,
    specPattern: "e2e/admin-app/**/*.cy.ts",
    supportFile: "support/e2e.{js,jsx,ts,tsx}",
    screenshotsFolder: "screenshots",
  },
});
