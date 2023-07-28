import testData from "../../testData";
import { faker } from "@faker-js/faker";

describe("sign up page", () => {
  it("should sign up director successfully", () => {
    cy.visit("/signUp");

    const director = {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };

    cy.getByTestId("firstName-input")
      .type(director.firstName)
      .should("have.value", director.firstName);

    cy.getByTestId("lastName-input")
      .type(director.lastName)
      .should("have.value", director.lastName);

    cy.getByTestId("email-input")
      .type(director.email)
      .should("have.value", director.email);

    cy.getByTestId("password-input")
      .type(director.password)
      .should("have.value", director.password);

    cy.getByTestId("validatePassword-input")
      .type(director.password)
      .should("have.value", director.password);

    cy.getByTestId("activationPassword-input")
      .type(testData.activationPassword)
      .should("have.value", testData.activationPassword);

    cy.getByTestId("sign-up-submit-button").click();

    cy.shouldBeRelativePath("/login");
  });

  it("should show sign up page", () => {
    cy.visit("/signUp");
    cy.getByTestId("sign up page").should("exist");
  });

  it("show error if firstName missing", () => {
    cy.visit("/signUp");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("firstName-input-helper-text").should("be.visible");
  });

  it("show error if lastName missing", () => {
    cy.visit("/signUp");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("lastName-input-helper-text").should("be.visible");
  });

  it("show error if email missing", () => {
    cy.visit("/signUp");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("email-input-helper-text").should("be.visible");
  });

  it("show error if password missing", () => {
    cy.visit("/signUp");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("password-input-helper-text").should("be.visible");
  });

  it("show error if password is too short", () => {
    cy.visit("/signUp");

    cy.getByTestId("password-input").type("123");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("password-input-helper-text").should("be.visible");
  });

  it("show error if validatePassword is missing", () => {
    cy.visit("/signUp");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("validatePassword-input-helper-text").should("be.visible");
  });

  it("show error if validatePassword != password", () => {
    cy.visit("/signUp");

    cy.getByTestId("password-input").type("1234567890ABC");

    cy.getByTestId("validatePassword-input").type("ABC0987654321");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("validatePassword-input-helper-text").should("be.visible");
  });

  it("should be valid if password == validatePassword", () => {
    cy.visit("/signUp");

    cy.getByTestId("password-input").type("1234567890ABC");

    cy.getByTestId("validatePassword-input").type("1234567890ABC");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("validatePassword-input-helper-text").should("not.exist");
  });

  it("show error if activationPassword is missing", () => {
    cy.visit("/signUp");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("activationPassword-input-helper-text").should("be.visible");
  });

  it("show error if activationPassword is missing", () => {
    cy.visit("/signUp");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("activationPassword-input-helper-text").should("be.visible");
  });

  it("show error if activationPassword is missing", () => {
    cy.visit("/signUp");

    cy.getByTestId("sign-up-submit-button").click();

    cy.getByTestId("activationPassword-input-helper-text").should("be.visible");
  });
});
