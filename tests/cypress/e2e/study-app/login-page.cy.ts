import testData from "../../testData";

describe("login page", () => {
  it("should show login page", () => {
    cy.visit("/login");
    cy.getByTestId("login page").should("exist");
  });

  it("show error if id missing", () => {
    cy.visit("/login");

    cy.getByTestId("password-input")
      .type(testData.participant.password)
      .should("have.value", testData.participant.password);

    cy.getByTestId("login-submit-button").click();

    cy.getByTestId("id-input-helper-text").should(
      "have.text",
      "Bitte ID eingeben"
    );
  });

  it("show error if password missing", () => {
    cy.visit("/login");

    cy.getByTestId("id-input")
      .type(testData.participant.id)
      .should("have.value", testData.participant.id);

    cy.getByTestId("login-submit-button").click();

    cy.getByTestId("password-input-helper-text").should(
      "have.text",
      "Bitte Passwort eingeben"
    );
  });

  it("show error if id does not exist", () => {
    cy.visit("/login");

    cy.getByTestId("id-input")
      .type("wrongid")
      .should("have.value", "wrongid");

    cy.getByTestId("password-input")
      .type(testData.participant.password)
      .should("have.value", testData.participant.password);

    cy.getByTestId("login-submit-button").click();

    cy.getByTestId("login-error-text").should("be.visible");
  });

  it("show error if password is wrong", () => {
    cy.visit("/login");

    cy.getByTestId("id-input")
      .type(testData.participant.id)
      .should("have.value", testData.participant.id);

    cy.getByTestId("password-input")
      .type("wrong-password")
      .should("have.value", "wrong-password");

    cy.getByTestId("login-submit-button").click();

    cy.getByTestId("login-error-text").should("be.visible");
  });

  it("should login successfully", () => {
    cy.visit("/login");

    cy.getByTestId("id-input")
      .type(testData.participant.id)
      .should("have.value", testData.participant.id);

    cy.getByTestId("password-input")
      .type(testData.participant.password)
      .should("have.value", testData.participant.password);

    cy.getByTestId("login-submit-button").click();

    cy.shouldBeRelativePath("/tasks");
  });
});