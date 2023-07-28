import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000",
    env: {
      apiUrl: "http://localhost:9000",
    },
    video: false,
    specPattern: "e2e/study-app/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "support/e2e.{js,jsx,ts,tsx}",
    screenshotsFolder: "screenshots"
  },
});
