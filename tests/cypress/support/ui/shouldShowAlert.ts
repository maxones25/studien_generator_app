Cypress.Commands.add(
  "shouldShowAlert",
  (type: "success" | "error", text: string) => {
    if (text) {
      cy.getByTestId(`${type} alert`)
        .should("be.visible")
        .contains(text)
        .get(`button[title="Close"]`)
        .click();
    } else {
      cy.getByTestId(`${type} alert`)
        .should("be.visible")
        .get(`button[title="Close"]`)
        .click();
    }
  }
);
