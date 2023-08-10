describe("task page", () => {
  beforeEach(() => {
    cy.intercept('GET', '/dev-sw.js?dev-sw', {statusCode: 404});
    cy.intercept('GET', '/sw.js', {statusCode: 404});
  })

  it("should show task page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/tasks");
      cy.getByTestId("tasks page").should("exist");
    })
  });

  it("open datepicker", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/tasks");
      cy.getByTestId("button-date-picker").click();
      cy.getByTestId("date-dialog").should("exist");
    })
  });
});