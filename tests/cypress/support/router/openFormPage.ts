Cypress.Commands.add("openFormPage", (studyId: string, formId: string) => {
  cy.visit(`/studies/${studyId}/forms/${formId}`);

  cy.getByTestId("form page");
});
