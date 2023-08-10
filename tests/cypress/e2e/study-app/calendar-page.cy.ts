describe('calendar page', () => {

  beforeEach(() => {
    cy.intercept('GET', '/dev-sw.js?dev-sw', {statusCode: 404});
    cy.intercept('GET', '/sw.js', {statusCode: 404});
  })

  it("should open to calendar page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/calendar");
      cy.getByTestId("calendar page").should("exist");
    });
  });

  
})