import fakeData from "../../../fakeData";

describe("change study name", () => {
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

  it.only("should change study name", () => {
    cy.openStudyPage(study.id);

    const newStudy = fakeData.study();

    cy.getByTestId("edit name").click();
    cy.getByTestId("change name").clear();
    cy.getByTestId("change name").type(newStudy.name);

    cy.getByTestId("change isActive").click();

    cy.shouldShowAlert("success", "geändert");

    cy.getByTestId("study page").contains(newStudy.name);
  });
});
