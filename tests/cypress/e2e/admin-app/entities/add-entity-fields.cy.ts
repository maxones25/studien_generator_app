import fakeData from "../../../fakeData";

describe("add entity fields", () => {
  let study;
  let entity;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    study = fakeData.study();
    entity = fakeData.entity();
    cy.createStudy(study).then((id) => {
      study.id = id;
      cy.createEntity(study.id, entity).then((id) => {
        entity.id = id;
        cy.setAccessToken("director");
      });
    });
  });

  it("should create text field", () => {
    cy.openEntityPage(study.id, entity.id);

    cy.getByTestId("open field dialog").click();

    const field = fakeData.entityField("Text");

    cy.getByTestId("change name").type(field.name);

    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("success", "hinzugefügt");

    cy.getByTestId(`field item ${field.name}`)
      .should("exist")
      .getByTestId("field type")
      .contains("Text");
  });

  it("should create date field", () => {
    cy.openEntityPage(study.id, entity.id);

    cy.getByTestId("open field dialog").click();

    const field = fakeData.entityField("Date");

    cy.getByTestId("change name").type(field.name);

    cy.getByTestId("change type").click();

    cy.getByTestId("change type option Date").click();

    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("success", "hinzugefügt");

    cy.getByTestId(`field item ${field.name}`)
      .should("exist")
      .getByTestId("field type")
      .contains("Datum");
  });

  it("should create time field", () => {
    cy.openEntityPage(study.id, entity.id);

    cy.getByTestId("open field dialog").click();

    const field = fakeData.entityField("Time");

    cy.getByTestId("change name").type(field.name);

    cy.getByTestId("change type").click();

    cy.getByTestId("change type option Time").click();

    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("success", "hinzugefügt");

    cy.getByTestId(`field item ${field.name}`)
      .should("exist")
      .getByTestId("field type")
      .contains("Uhrzeit");
  });

  it("should create boolean field", () => {
    cy.openEntityPage(study.id, entity.id);

    cy.getByTestId("open field dialog").click();

    const field = fakeData.entityField("Boolean");

    cy.getByTestId("change name").type(field.name);

    cy.getByTestId("change type").click();

    cy.getByTestId("change type option Boolean").click();

    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("success", "hinzugefügt");

    cy.getByTestId(`field item ${field.name}`)
      .should("exist")
      .getByTestId("field type")
      .contains("Wahrheitswert");
  });

  it("should create number field", () => {
    cy.openEntityPage(study.id, entity.id);

    cy.getByTestId("open field dialog").click();

    const field = fakeData.entityField("Number");

    cy.getByTestId("change name").type(field.name);

    cy.getByTestId("change type").click();

    cy.getByTestId("change type option Number").click();

    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("success", "hinzugefügt");

    cy.getByTestId(`field item ${field.name}`)
      .should("exist")
      .getByTestId("field type")
      .contains("Zahl");
  });

  it("should create datetime field", () => {
    cy.openEntityPage(study.id, entity.id);

    cy.getByTestId("open field dialog").click();

    const field = fakeData.entityField("DateTime");

    cy.getByTestId("change name").type(field.name);

    cy.getByTestId("change type").click();

    cy.getByTestId("change type option DateTime").click();

    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("success", "hinzugefügt");

    cy.getByTestId(`field item ${field.name}`)
      .should("exist")
      .getByTestId("field type")
      .contains("Datum und Uhrzeit");
  });

  it("should not create empty field", () => {
    cy.openEntityPage(study.id, entity.id);

    cy.getByTestId("open field dialog").click();

    cy.getByTestId("submit field form").click();

    cy.contains("Bitte Name eingeben");
  });

  it.only("should not create field twice", () => {
    cy.openEntityPage(study.id, entity.id);

    const field = fakeData.entityField("DateTime");

    cy.getByTestId("open field dialog").click();
    cy.getByTestId("change name").type(field.name);
    cy.getByTestId("change type").click();
    cy.getByTestId("change type option DateTime").click();
    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("success", "hinzugefügt");
    cy.getByTestId(`field item ${field.name}`)
      .should("exist")
      .getByTestId("field type")
      .contains("Datum und Uhrzeit");

    cy.getByTestId("open field dialog").click();
    cy.getByTestId("change name").type(field.name);
    cy.getByTestId("change type").click();
    cy.getByTestId("change type option DateTime").click();
    cy.getByTestId("submit field form").click();

    cy.shouldShowAlert("error", "Fehler");
  });
});
