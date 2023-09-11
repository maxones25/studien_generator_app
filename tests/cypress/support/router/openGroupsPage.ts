Cypress.Commands.add("openGroupsPage", (studyId: string) => {
  cy.visit(`/studies/${studyId}/groups`);

  cy.getByTestId("groups page");
});
