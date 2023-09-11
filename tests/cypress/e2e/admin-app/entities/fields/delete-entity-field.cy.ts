import fakeData from "../../../../fakeData";

describe("delete entity field", () => {
  let studyId;
  let entityId;
  let fieldId;
  let field;

  before(() => {
    cy.fetchAccessToken("director");

    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
      cy.createEntity(studyId, fakeData.entity()).then((id) => {
        entityId = id;
      });
    });
  });

  beforeEach(() => {
    field = fakeData.entityField("Text");
    cy.createEntityField(studyId, entityId, field).then((id) => {
      fieldId = id;
    });

    cy.setAccessToken("director");
  });

  it("should delete an entity field", () => {
    cy.openEntityPage(studyId, entityId);

    cy.getByTestId(`delete field ${fieldId}`).trigger("mouseover");

    cy.contains("Feld löschen");

    cy.getByTestId(`delete field ${fieldId}`).click();

    cy.getByTestId("change target").type(field.name);

    cy.getByTestId("confirm delete field").click();

    cy.shouldShowAlert("success", "gelöscht");

    cy.getByTestId("entity page").should("not.contain", field.name);
  });
});
