import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      apiUrl: "http://localhost:8000",
    },
    video: false,
    specPattern: "cypress/e2e/admin-app/**/*.cy.{js,jsx,ts,tsx}"
  },
});
