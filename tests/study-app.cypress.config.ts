import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000",
    env: {
      apiUrl: "http://localhost:8000",
    },
    video: false,
    specPattern: "cypress/e2e/study-app/**/*.cy.{js,jsx,ts,tsx}"
  },
});
