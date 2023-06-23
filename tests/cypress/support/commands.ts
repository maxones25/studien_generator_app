/// <reference types="cypress" />

import "cypress-wait-until";
import "cypress-localstorage-commands";

type Director = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  activationPassword: string,
}

type Study = {
  name: string;
}

type Group = {
  name: string;
  studyId: string
}

declare global {
  namespace Cypress {
    interface Chainable {
      setupTest(): Chainable<any>;
      signUpDirector(data: Director): Chainable<any>;
      createStudy(data: Study): Chainable<any>;
      createStudyGroup(data: Group): Chainable<any>;
      fetchAccessToken(): Chainable<any>;
      getByTestId(name: string): Chainable<any>;
    }
  }
}

Cypress.Commands.add("getByTestId", (name: string) => {
  return cy.get(`[data-testid="${name}"]`);
});

Cypress.Commands.add("signUpDirector", (data: Director) => {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/auth/directors/signup`,
    body: data,
  }).its("body")
});

Cypress.Commands.add("createStudy", (data: Study) => {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/studies`,
    body: data,
  }).its("body")
});

Cypress.Commands.add("createStudyGroup", ({ studyId, ...data }: Group) => {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/studies/${studyId}/groups`,
    body: data
  }).its("body")
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
