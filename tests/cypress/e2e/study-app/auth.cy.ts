describe("auth", () => {
  beforeEach(() => {
    cy.intercept('GET', '/dev-sw.js?dev-sw', {statusCode: 404});
    cy.intercept('GET', '/sw.js', {statusCode: 404});
  })

  it("should redirect to login page", () => {
    cy.visit("/");
    cy.getByTestId("login page").should("exist");
  });

  it("should open to tasks page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/");
      cy.getByTestId("tasks page").should("exist");
    });
  });
})