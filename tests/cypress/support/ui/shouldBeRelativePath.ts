Cypress.Commands.add("shouldBeRelativePath", (path: string) => {
  cy.url().should("equal", Cypress.config().baseUrl + path);
});