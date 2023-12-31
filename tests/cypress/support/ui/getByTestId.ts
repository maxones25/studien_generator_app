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
    const element = cy.get(`[data-testid="${name}"]`, options);
    return element;
  }
);
