import { faker } from "@faker-js/faker";
import testData from "../../testData";

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

  it("should list studies", () => {
    cy.visit("/studies");

    cy.getByTestId("loading studies spinner").should("exist");

    cy.contains(testData.study.name).should("exist");
  });

  it("should open create study dialog", () => {
    cy.visit("/studies");

    cy.getByTestId("create-study-button").click();

    cy.getByTestId("study form").should("be.visible");
  });

  it("should not create study with empty name", () => {
    cy.visit("/studies");

    cy.getByTestId("create-study-button").click();

    cy.getByTestId("study form").should("be.visible");

    cy.getByTestId("submit-study-form").click();

    cy.getByTestId("name-input-helper-text").should("be.visible");
  });

  it("should create new study", () => {
    cy.visit("/studies");

    const name = faker.company.name();

    cy.contains(name).should("not.exist");

    cy.getByTestId("create-study-button").click();

    cy.getByTestId("study form").should("be.visible");

    cy.getByTestId("name-input").type(name).should("have.value", name);

    cy.getByTestId("submit-study-form").click();

    cy.contains(name).should("exist");
  });

  it("should update existing study", () => {
    cy.visit("/studies");

    // create new study

    const name = faker.company.name();

    cy.contains(name).should("not.exist");

    cy.getByTestId("create-study-button").click();

    cy.getByTestId("study form").should("be.visible");

    cy.getByTestId("name-input").type(name).should("have.value", name);

    cy.getByTestId("submit-study-form").click();

    cy.contains(name).should("exist");

    // update new study

    const newName = faker.company.name();

    cy.contains(newName).should("not.exist");

    cy.getByTestId(`update-study-${name}-button`).click();

    cy.getByTestId("study form").should("be.visible");

    cy.getByTestId("name-input").should("not.have.value", "");

    cy.getByTestId("name-input").clear();

    cy.getByTestId("name-input").type(newName).should("have.value", newName);

    cy.getByTestId("submit-study-form").click();

    cy.contains(newName).should("exist");
  });

  it("should open delete dialog", () => {
    cy.visit("/studies");

    // create new study

    const name = faker.company.name();

    cy.contains(name).should("not.exist");

    cy.getByTestId("create-study-button").click();

    cy.getByTestId("study form").should("be.visible");

    cy.getByTestId("name-input").type(name).should("have.value", name);

    cy.getByTestId("submit-study-form").click();

    cy.contains(name).should("exist");

    // delete new study

    cy.getByTestId(`delete-study-${name}-button`).click();

    cy.getByTestId("delete study form").should("be.visible");

    cy.getByTestId("name-input").type(name).should("have.value", name);

    cy.getByTestId("submit delete studies").click();

    cy.contains(name).should("not.exist");
  });

  it("should not delete study if name is missing", () => {
    cy.visit("/studies");

    // create new study

    const name = faker.company.name();

    cy.contains(name).should("not.exist");

    cy.getByTestId("create-study-button").click();

    cy.getByTestId("study form").should("be.visible");

    cy.getByTestId("name-input").type(name).should("have.value", name);

    cy.getByTestId("submit-study-form").click();

    cy.contains(name).should("exist");

    // delete new study

    cy.getByTestId(`delete-study-${name}-button`).click();

    cy.getByTestId("delete study form").should("be.visible");

    cy.getByTestId("submit delete studies").click();

    cy.getByTestId("name-input-helper-text").should("be.visible");
  });

  it("should not delete study if name != study name", () => {
    cy.visit("/studies");

    // create new study

    const name = faker.company.name();

    cy.contains(name).should("not.exist");

    cy.getByTestId("create-study-button").click();

    cy.getByTestId("study form").should("be.visible");

    cy.getByTestId("name-input").type(name).should("have.value", name);

    cy.getByTestId("submit-study-form").click();

    cy.contains(name).should("exist");

    // delete new study

    cy.getByTestId(`delete-study-${name}-button`).click();

    cy.getByTestId("delete study form").should("be.visible");

    const wrongName = "wrong-name";

    cy.getByTestId("name-input")
      .type(wrongName)
      .should("have.value", wrongName);

    cy.getByTestId("submit delete studies").click();

    cy.getByTestId("name-input-helper-text").should("be.visible");
  });

  it("should show error if studies can not be loaded", () => {
    cy.intercept("GET", Cypress.env("apiUrl") + "/studies", {
      forceNetworkError: true,
    }).as("getStudies");

    cy.visit("/studies");

    cy.getByTestId("studies page").should("exist");

    cy.getByTestId("get-studies-error-text", { timeout: 15000 }).should(
      "exist"
    );
  });
});
