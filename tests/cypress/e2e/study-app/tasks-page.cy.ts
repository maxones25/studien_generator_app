import testData from "../../../testData";

describe("task page", () => {
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