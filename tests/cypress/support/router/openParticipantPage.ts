Cypress.Commands.add(
  "openParticipantPage",
  (studyId: string, participantId: string) => {
    cy.visit(`/studies/${studyId}/participants/${participantId}`);

    cy.getByTestId("participant page");
  }
);
