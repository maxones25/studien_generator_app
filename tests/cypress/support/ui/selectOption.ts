Cypress.Commands.add("selectOption", (name: string, option: string) => {

  cy.getByTestId(`change ${name}`).click();

  cy.getByTestId(`change ${name} option ${option}`).click();
});
