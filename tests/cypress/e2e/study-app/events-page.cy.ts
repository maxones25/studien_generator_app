describe('events page', () => {

  beforeEach(() => {
    cy.intercept('GET', '/dev-sw.js?dev-sw', {statusCode: 404});
    cy.intercept('GET', '/sw.js', {statusCode: 404});
  })

  it("should open to events page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/events");
      cy.getByTestId("events page").should("exist");
    });
  });

  
})