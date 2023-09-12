Cypress.Commands.add("openGroupPage", (studyId: string, groupId: string) => {
  cy.visit(`/studies/${studyId}/groups/${groupId}`);

  cy.getByTestId("group page");
});
