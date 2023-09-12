import fakeData from "../../../fakeData";

describe("change entity name", () => {
  let studyId;
  let entity;
  let entityId;

  before(() => {
    cy.fetchAccessToken("director");

    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
    });
  });

  beforeEach(() => {
    entity = fakeData.entity();
    cy.createEntity(studyId, entity).then((id) => {
      entityId = id;
      cy.setAccessToken("director");
    });
  });

  it("should change entity name", () => {
    cy.openEntityPage(studyId, entityId);

    const newName = fakeData.entity().name;

    cy.getByTestId("edit name").click();

    cy.getByTestId("change name").clear();

    cy.getByTestId("change name").type(newName+"\n")

    cy.shouldShowAlert("success", "geändert");

    cy.getByTestId("entity page").contains(newName);
    cy.getByTestId("entity page").should("not.contain", entity.name);
  });
});
