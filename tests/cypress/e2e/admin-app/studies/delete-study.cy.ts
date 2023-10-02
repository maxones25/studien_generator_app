import fakeData from "../../../fakeData";

describe("delete study", () => {
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

  it("should hard delete study", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("open delete dialog").click();
    cy.getByTestId(`change target`).type(study.name);
    cy.getByTestId(`change hardDelete`).click();
    cy.getByTestId("confirm delete study").click();

    cy.shouldShowAlert("success", "gelöscht");

    cy.shouldBeRelativePath("/studies");

    cy.getByTestId("studies page")
      .should("be.visible")
      .contains(study.name)
      .should("not.exist");
  });

  it("should soft delete study", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("open delete dialog").click();
    cy.getByTestId(`change target`).type(study.name);
    cy.getByTestId("confirm delete study").click();

    cy.shouldShowAlert("success", "gelöscht");

    cy.shouldBeRelativePath("/studies");

    cy.getByTestId("studies page")
      .should("be.visible")
      .contains(study.name)
      .should("exist");
  });

  it("should not delete if target is wrong", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("open delete dialog").click();
    cy.getByTestId(`change target`).type("wrong target");
    cy.getByTestId("confirm delete study").click();

    cy.contains("ungültig");
  });

  it("should close delete dialog", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("open delete dialog").click();
    cy.getByTestId("cancel delete study").click();

    cy.getByTestId("confirm delete study").should("not.exist");
  });
});
