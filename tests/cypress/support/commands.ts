/// <reference types="cypress" />

import "cypress-wait-until";
import "cypress-localstorage-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      fetchAccessToken(): Chainable<any>;
      shouldBeRelativePath(path: string): Chainable<any>;
      getByTestId(
        name: string,
        options?: Partial<
          Cypress.Loggable &
            Cypress.Timeoutable &
            Cypress.Withinable &
            Cypress.Shadow
        >
      ): Chainable<any>;
    }
  }
}

Cypress.Commands.add("shouldBeRelativePath", (path: string) => {
  cy.url().should("equal", Cypress.config().baseUrl + path);
});

Cypress.Commands.add(
  "getByTestId",
  (
    name: string,
    options?: Partial<
      Cypress.Loggable &
        Cypress.Timeoutable &
        Cypress.Withinable &
        Cypress.Shadow
    >
  ) => {
    return cy.get(`[data-testid="${name}"]`, options);
  }
);

Cypress.Commands.add("fetchAccessToken", () => {
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/auth/participants/login`,
      body: {
        id: "3b87163e-9ad0-4a8b-82bb-0023d2b35ba2",
        password: "GFeDrKZ9QV31",
      },
    })
    .its("body")
    .then(({ accessToken }) => {
      Cypress.env("accessToken", accessToken);
      cy.setLocalStorage("accessToken", JSON.stringify(accessToken));
      cy.saveLocalStorage();
    });
});
