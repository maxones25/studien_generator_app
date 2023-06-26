import testData from "../../../testData";

describe("studies page", () => {
  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    cy.setAccessToken("director");
  });

  it("should redirect / to /studies", () => {
    cy.visit("/");

    cy.shouldBeRelativePath("/studies");
  });

  it("should show studies page", () => {
    cy.visit("/studies");
    cy.getByTestId("studies page").should("exist");
  });
});
