import fakeData from "../../../fakeData";

describe("create entity", () => {
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

  it("should create entity", () => {
    cy.openEntitiesPage(study.id);

    const entity = fakeData.entity();

    cy.getByTestId("open entity input").click();

    cy.getByTestId("change entity text").type(entity.name + "\n");

    cy.shouldShowAlert("success", "erstellt");

    cy.getByTestId("entities list").contains(entity.name);
  });

  it("should not create entity with empty name", () => {
    cy.openEntitiesPage(study.id);

    const entity = fakeData.entity();

    cy.getByTestId("open entity input").click();

    cy.getByTestId("change entity text").type("\n");

    cy.shouldShowAlert("error", "Name darf nicht leer sein");
  });

  it("should not create entity because name already exists", () => {
    cy.openEntitiesPage(study.id);

    const entity = fakeData.entity();

    cy.getByTestId("open entity input").click();

    cy.getByTestId("change entity text").type(entity.name);

    cy.getByTestId("submit entity").click();

    cy.shouldShowAlert("success", "erstellt");

    cy.getByTestId("open entity input").click();

    cy.getByTestId("change entity text").type(entity.name);

    cy.getByTestId("submit entity").click();

    cy.shouldShowAlert("error", "Fehler");
  });
});
