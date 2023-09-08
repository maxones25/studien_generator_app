Cypress.Commands.add(
  "addMember",
  (studyId: string, name: string, role: "admin" | "employee") => {
    cy.visit(`/studies/${studyId}`);

    cy.contains("Mitarbeiter hinzufügen").should("exist");

    cy.getByTestId("search member").type(name);

    cy.contains(name).click();

    cy.getByTestId("select role").click();

    if (role === "admin") {
      cy.getByTestId("select role option 1").click();
    } else {
      cy.getByTestId("select role option 0").click();
    }

    cy.getByTestId("submit invite member").click();

    cy.getByTestId("success alert")
      .should("be.visible")
      .get(`button[title="Close"]`)
      .click();
  }
);
