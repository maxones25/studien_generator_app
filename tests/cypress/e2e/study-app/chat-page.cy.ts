describe('chat page', () => {

  beforeEach(() => {
    cy.intercept('GET', '/dev-sw.js?dev-sw', {statusCode: 404});
  })

  it("should open to chat page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/chat");
      cy.getByTestId("chat page").should("exist");
    });
  });

  
})