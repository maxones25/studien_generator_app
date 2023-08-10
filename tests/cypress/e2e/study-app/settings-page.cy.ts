describe('settings page', () => {

  beforeEach(() => {
    cy.intercept('GET', '/dev-sw.js?dev-sw', {statusCode: 404});
    cy.intercept('GET', '/sw.js', {statusCode: 404});
  })

  it("should open to settings page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/settings");
      cy.getByTestId("settings page").should("exist");
    });
  });

  
})