describe("home page 2", () => {
  it("should redirect to login page", () => {
    cy.visit("/");
    cy.getByTestId("login page").should("exist")
  });

  it("should open to home page", () => {
    cy.fetchAccessToken().then(() => {
      cy.visit("/");
      cy.getByTestId("home page").should("exist")
    });
  });
});
