Cypress.Commands.add(
  "findByTestId",
  (
    name: string,
    options?: Partial<
      Cypress.Loggable &
        Cypress.Timeoutable &
        Cypress.Withinable &
        Cypress.Shadow
    >
  ) => {
    return cy.find(`[data-testid="${name}"]`, options);
  }
);
