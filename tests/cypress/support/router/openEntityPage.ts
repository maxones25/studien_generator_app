Cypress.Commands.add("openEntityPage", (studyId: string, entityId: string) => {
  cy.visit(`/studies/${studyId}/entities/${entityId}`);

  cy.getByTestId("entity page");
});
