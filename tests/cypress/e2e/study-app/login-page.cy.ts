import testData from "../../testData";

describe("login page", () => {
  beforeEach(() => {
    cy.intercept('GET', '/dev-sw.js?dev-sw', {statusCode: 404});
    cy.intercept('GET', '/sw.js', {statusCode: 404});
  })

  it("should show login page", () => {
    cy.visit("/login");
    cy.getByTestId("login page").should("exist");
  });

  it("should login successfully", () => {
    cy.visit(`/login?
    id=${encodeURIComponent(testData.participant.id)}&
    password=${encodeURIComponent(testData.participant.password)}`);

    cy.getByTestId("login-submit-button").click();

    cy.shouldBeRelativePath("/tasks");
  });
});