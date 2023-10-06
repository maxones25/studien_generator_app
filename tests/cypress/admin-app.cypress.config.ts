import { defineConfig } from "cypress";

export default defineConfig({
  // reporter: "cypress-mochawesome-reporter",
  // reporterOptions: {
  //   charts: true,
  //   reportPageTitle: "custom-title",
  //   embeddedScreenshots: true,
  //   inlineAssets: true,
  //   saveAllAttempts: false,
  // },
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      apiUrl: "http://localhost:8000",
    },
    // video: false,
    specPattern: "e2e/admin-app/**/*.cy.ts",
    supportFile: "support/e2e.{js,jsx,ts,tsx}",
    // screenshotsFolder: "screenshots",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
