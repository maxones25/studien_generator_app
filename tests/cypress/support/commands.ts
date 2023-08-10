/// <reference types="cypress" />

import "cypress-wait-until";
import "cypress-localstorage-commands";
import testData from "../testData";

declare global {
  namespace Cypress {
    interface Chainable {
      fetchAccessToken(type: "director" | "participant"): Chainable<any>;
      setAccessToken(type: "director" | "participant"): Chainable<any>;
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

Cypress.Commands.add("fetchAccessToken", (type: "director" | "participant") => {
  if (type === "director") {
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/auth/login`,
        body: {
          email: testData.director.email,
          password: testData.director.password,
        },
      })
      .its("body")
      .then(({ accessToken }) => {
        Cypress.env("directorAccessToken", accessToken);
        cy.setLocalStorage("accessToken", JSON.stringify(accessToken));
        cy.saveLocalStorage();
      });
  } else if (type === "participant") {
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/auth/login`,
        body: {
          id: testData.participant.id,
          password: testData.participant.password,
        },
      })
      .its("body")
      .then(({ accessToken }) => {
        Cypress.env("participantAccessToken", accessToken);
        cy.setLocalStorage("accessToken", JSON.stringify(accessToken));
        cy.saveLocalStorage();
      });
  }
});

Cypress.Commands.add("setAccessToken", (type: "director" | "participant") => {
  const accessToken = Cypress.env(type + "AccessToken");
  cy.setLocalStorage("accessToken", JSON.stringify(accessToken));
  cy.saveLocalStorage();
});
