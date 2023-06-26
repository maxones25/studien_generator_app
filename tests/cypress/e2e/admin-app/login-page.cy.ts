import testData from "../../../testData";

describe("login page", () => {
  it("should show login page", () => {
    cy.visit("/login");
    cy.getByTestId("login page").should("exist");
  });

  it("show error if email missing", () => {
    cy.visit("/login");

    cy.getByTestId("password-input")
      .type(testData.director.password)
      .should("have.value", testData.director.password);

    cy.getByTestId("login-submit-button").click();

    cy.getByTestId("email-input-helper-text").should(
      "have.text",
      "Bitte Email eingeben"
    );
  });

  it("show error if password missing", () => {
    cy.visit("/login");

    cy.getByTestId("email-input")
      .type(testData.director.email)
      .should("have.value", testData.director.email);

    cy.getByTestId("login-submit-button").click();

    cy.getByTestId("password-input-helper-text").should(
      "have.text",
      "Bitte Passwort eingeben"
    );
  });

  it("show error if email does not exist", () => {
    cy.visit("/login");

    cy.getByTestId("email-input")
      .type("wrong@email.de")
      .should("have.value", "wrong@email.de");

    cy.getByTestId("password-input")
      .type(testData.director.password)
      .should("have.value", testData.director.password);

    cy.getByTestId("login-submit-button").click();

    cy.getByTestId("login-error-text").should("be.visible");
  });

  it("show error if password is wrong", () => {
    cy.visit("/login");

    cy.getByTestId("email-input")
      .type(testData.director.email)
      .should("have.value", testData.director.email);

    cy.getByTestId("password-input")
      .type("wrong-password")
      .should("have.value", "wrong-password");

    cy.getByTestId("login-submit-button").click();

    cy.getByTestId("login-error-text").should("be.visible");
  });

  it("should login successfully", () => {
    cy.visit("/login");

    cy.getByTestId("email-input")
      .type(testData.director.email)
      .should("have.value", testData.director.email);

    cy.getByTestId("password-input")
      .type(testData.director.password)
      .should("have.value", testData.director.password);

    cy.getByTestId("login-submit-button").click();

    cy.shouldBeRelativePath('/');
  });
});
