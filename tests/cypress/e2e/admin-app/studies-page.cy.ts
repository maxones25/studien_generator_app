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

  it("should open a study", () => {
    cy.visit("/studies");

    cy.getByTestId("open study 0").click();

    cy.getByTestId("study page").should("exist");

  });

  it("should logout director", () => {
    cy.visit("/studies");

    const name = faker.company.name();

    cy.contains(name).should("not.exist");

    cy.getByTestId("logout director").click();

    cy.shouldBeRelativePath("/login");
  });
});
