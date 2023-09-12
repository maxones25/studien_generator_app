import fakeData from "../../../../fakeData";

describe("change entity field", () => {
  let studyId;
  let entityId;

  before(() => {
    cy.fetchAccessToken("director");

    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
    });
  });

  beforeEach(() => {
    cy.createEntity(studyId, fakeData.entity()).then((id) => {
      entityId = id;
      cy.setAccessToken("director");
    });
  });

  it("should change a field name", () => {
    const field = fakeData.entityField("Text");

    const newData = fakeData.entityField("Time");

    cy.createEntityField(studyId, entityId, field);

    cy.openEntityPage(studyId, entityId);

    cy.contains(field.name).click();

    cy.getByTestId("change name").clear();
    cy.getByTestId("change name").type(newData.name);

    cy.selectOption("type", newData.type);

    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("success", "geändert");

    cy.getByTestId(`field item ${newData.name}`)
      .should("exist")
      .getByTestId("field type")
      .contains("Uhrzeit");
  });

  it("should fail because name already exists", () => {
    const field = fakeData.entityField("Text");
    const field2 = fakeData.entityField("Text");

    cy.createEntityField(studyId, entityId, field);
    cy.createEntityField(studyId, entityId, field2);

    cy.openEntityPage(studyId, entityId);

    cy.contains(field2.name).click();

    cy.getByTestId("change name").clear();
    cy.getByTestId("change name").type(field.name);

    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("error", "Fehler");
  });

  it("should fail because name is empty", () => {
    const field = fakeData.entityField("Text");

    cy.createEntityField(studyId, entityId, field);

    cy.openEntityPage(studyId, entityId);

    cy.contains(field.name).click();

    cy.getByTestId("change name").clear();

    cy.getByTestId("submit field form").click();

    cy.contains("Bitte Name eingeben");
  });
});
