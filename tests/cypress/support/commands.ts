/// <reference types="cypress" />

import "cypress-wait-until";
import "cypress-localstorage-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      fetchAccessToken(): Chainable<any>;
      getByTestId(name: string): Chainable<any>;
    }
  }
}

Cypress.Commands.add("getByTestId", (name: string) => {
  return cy.get(`[data-testid="${name}"]`);
});

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
