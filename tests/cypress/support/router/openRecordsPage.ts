Cypress.Commands.add("openRecordsPage", (studyId: string) => {
  cy.visit(`/studies/${studyId}/records/`);

  cy.getByTestId("records page");
});
