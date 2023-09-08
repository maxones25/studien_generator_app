Cypress.Commands.add(
  "getByTestId",
  (
    name: string,
    options?: Partial<
      Cypress.Loggable &
        Cypress.Timeoutable &
        Cypress.Withinable &
        Cypress.Shadow
    >
  ) => {
    return cy.get(`[data-testid="${name}"]`, options);
  }
);
