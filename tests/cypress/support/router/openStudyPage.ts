Cypress.Commands.add("openStudyPage", (studyId: string) => {
  cy.visit(`/studies/${studyId}`);
});
