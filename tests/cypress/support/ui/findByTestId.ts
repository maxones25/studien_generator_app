Cypress.Commands.add(
  "findByTestId",
  { prevSubject: "element" },
  (
    subject,
    name: string,
    options?: Partial<
      Cypress.Loggable &
        Cypress.Timeoutable &
        Cypress.Withinable &
        Cypress.Shadow
    >
  ) => {
    return cy.wrap(subject).find(`[data-testid="${name}"]`, options);
  }
);
