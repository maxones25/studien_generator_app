Cypress.Commands.add("openFormsPage", (studyId: string) => {
  cy.visit(`/studies/${studyId}/forms/`);

  cy.getByTestId("forms page");
});
