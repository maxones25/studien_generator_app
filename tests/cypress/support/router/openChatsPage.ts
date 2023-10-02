Cypress.Commands.add("openChatsPage", (studyId: string) => {
  cy.visit(`/studies/${studyId}/chats/`);

  cy.getByTestId("chats page");
});
