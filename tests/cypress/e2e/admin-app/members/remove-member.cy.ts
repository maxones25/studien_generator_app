import fakeData from "../../../fakeData";

describe("remove member", () => {
  let study;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    study = fakeData.study();
    cy.createStudy(study).then((id) => {
      study.id = id;
      cy.setAccessToken("director");
    });
  });

  it("should remove member", () => {
    cy.addMember(study.id, "Alice Smith", "employee");

    cy.getByTestId("select Alice Smith role").contains("Mitarbeiter");

    cy.getByTestId("remove member Alice Smith").click();

    cy.shouldShowAlert("success");
  });

  it("should not remove last admin", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("select Max Mustermann role").contains("Administrator");

    cy.getByTestId("remove member Max Mustermann").click();

    cy.shouldShowAlert("error");
  });

  it("should remove admin if there is one admin left", () => {
    cy.addMember(study.id, "Alice Smith", "admin")

    cy.getByTestId("select Max Mustermann role").contains("Administrator");

    cy.getByTestId("remove member Max Mustermann").click();

    cy.shouldShowAlert("success");
  });
});
