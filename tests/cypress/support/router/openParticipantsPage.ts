
Cypress.Commands.add("openParticipantsPage", (studyId: string) => {
    cy.visit(`/studies/${studyId}/participants`);
  
    cy.getByTestId("participants page");
  });