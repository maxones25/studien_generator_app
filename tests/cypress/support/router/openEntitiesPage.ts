Cypress.Commands.add("openEntitiesPage", (studyId: string) => {
  cy.visit(`/studies/${studyId}/entities`);

  cy.getByTestId("entities page");
});
