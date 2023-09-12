import fakeData from "../../../fakeData";

describe("delete entity", () => {
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

  it("should delete entity", () => {
    cy.openEntityPage(studyId, entityId);

    cy.getByTestId("open delete dialog").click();

    cy.getByTestId("change target").type(entity.name);

    cy.getByTestId(`confirm delete entity`).click();

    cy.shouldShowAlert("success", "gelöscht");

    cy.getByTestId("entity page").should("not.exist");

    cy.getByTestId("entities page").should("not.contain", entity.name);
  });

  it("should not delete when target is wrong", () => {
    cy.openEntityPage(studyId, entityId);

    cy.getByTestId("open delete dialog").click();

    cy.getByTestId("change target").type(fakeData.entity().name);

    cy.getByTestId(`confirm delete entity`).click();

    cy.contains("ungültig");
  });

  it("should not delete when target is empty", () => {
    cy.openEntityPage(studyId, entityId);

    cy.getByTestId("open delete dialog").click();

    cy.getByTestId(`confirm delete entity`).click();

    cy.contains("ungültig");
  });

  it("should cancel delete entity", () => {
    cy.openEntityPage(studyId, entityId);

    cy.getByTestId("open delete dialog").click();

    cy.getByTestId("change target").type(entity.name);

    cy.getByTestId(`cancel delete entity`).click();

    cy.getByTestId(`confirm delete entity`).should("not.exist");

    cy.getByTestId("entity page").should("exist").contains(entity.name);
  });
});
