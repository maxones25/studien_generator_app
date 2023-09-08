import fakeData from "../../../fakeData";

describe("add member", () => {
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

  it("should add member as employee", () => {
    cy.openStudyPage(study.id);

    cy.contains("Mitarbeiter hinzufügen").should("exist");

    cy.getByTestId("search member").type("David B");

    cy.contains("David Brown").click();

    cy.getByTestId("select role").click();

    cy.getByTestId("select role option 0").click();

    cy.getByTestId("submit invite member").click();

    cy.getByTestId("success alert").should("be.visible");

    cy.getByTestId("select David Brown role").contains("Mitarbeiter");
  });

  it("should add member as admin", () => {
    cy.openStudyPage(study.id);

    cy.contains("Mitarbeiter hinzufügen").should("exist");

    cy.getByTestId("search member").type("Eva J");

    cy.contains("Eva Jones").click();

    cy.getByTestId("select role").click();

    cy.getByTestId("select role option 1").click();

    cy.getByTestId("submit invite member").click();

    cy.getByTestId("success alert").should("be.visible");

    cy.getByTestId("select Eva Jones role").contains("Administrator");
  });
});
