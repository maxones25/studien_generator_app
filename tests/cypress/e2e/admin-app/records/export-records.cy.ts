import fakeData from "../../../fakeData";

describe("export records", () => {
  let studyId;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
      cy.setAccessToken("director");
    });
  });

  it("should export records", () => {
    cy.openRecordsPage(studyId);

    cy.getByTestId("change columns").click();

    cy.getByTestId("columns").contains("Gruppe").click();
    cy.getByTestId("change columns").click();
    cy.getByTestId("columns").contains("Proband").click();
    cy.getByTestId("change columns").click();
    cy.getByTestId("columns").contains("Formular").click();
    cy.getByTestId("change columns").click();
    cy.getByTestId("columns").contains("geplant am").click();
    cy.getByTestId("change columns").click();
    cy.getByTestId("columns").contains("abgeschlossen am").click();

    cy.getByTestId("export table").click();

    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(`${downloadsFolder}/data.csv`)
      .should("exist")
      .should(
        "eq",
        `"Gruppe";"Proband";"Formular";"geplant am";"abgeschlossen am"\n`
      );
  });
});
