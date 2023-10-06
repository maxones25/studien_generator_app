import fakeData from "../../../fakeData";
import testData from "../../../testData";

describe("filter records", () => {
  let studyId = testData.study.id;
  let groupId;

  before(() => {
    cy.fetchAccessToken("director");
    cy.createGroup(studyId, fakeData.group()).then((id) => {
      groupId = id;
    });
  });

  it("should filter records", () => {
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

    cy.getByTestId("change entity-select").click();
    cy.getByTestId(`change entity-select option ${testData.entity.id}`).click();

    cy.getByTestId("change form-select").click();
    cy.getByTestId(`change form-select option ${testData.form.id}`).click();

    cy.getByTestId("change group").click();
    cy.getByTestId(`change group option ${testData.group.id}`).click();

    cy.getByTestId("change participant-select").click();
    cy.getByTestId(
      `change participant-select option ${testData.participant.id}`
    ).click();

    cy.getByTestId("records table").contains(testData.participant.number);

    cy.getByTestId("change group").click();
    cy.getByTestId(`change group option ${groupId}`).click();

    cy.getByTestId("records table").should(
      "not.contain",
      testData.participant.number
    );
  });
});
