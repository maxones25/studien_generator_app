import fakeData from "../../../fakeData";

describe("start study", () => {
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

  it("should not start study", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("change isActive").click();

    cy.shouldShowAlert("error");
  });

  it("should change start date", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("edit start date").click();
    cy.getByTestId("change start date").type("2024-01-01");
    cy.getByTestId("edit end date").click();

    cy.shouldShowAlert("success");
  });

  it("should change end date", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("edit end date").click();
    cy.getByTestId("change end date").type("2024-01-01");
    cy.getByTestId("edit start date").click();

    cy.shouldShowAlert("success");
  });

  it("should not change end date because its small than start date", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("edit start date").click();
    cy.getByTestId("change start date").type("2024-01-01");

    cy.getByTestId("edit end date").click();
    cy.getByTestId("change end date").type("2023-01-01");

    cy.getByTestId("edit start date").click();

    cy.shouldShowAlert("error");
  });

  it("should not change start date because its greater than end date", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("edit end date").click();
    cy.getByTestId("change end date").type("2023-01-01");

    cy.getByTestId("edit start date").click();
    cy.getByTestId("change start date").type("2024-01-01");

    cy.getByTestId("edit end date").click();

    cy.shouldShowAlert("error");
  });

  it("should change start and end date", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("edit start date").click();
    cy.getByTestId("change start date").type("2023-01-01");

    cy.getByTestId("edit end date").click();
    cy.getByTestId("change end date").type("2024-01-01");

    cy.getByTestId("change duration").click();

    cy.shouldShowAlert("success");
  });

  it("should not change duration because its too big", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("edit start date").click();
    cy.getByTestId("change start date").type("2023-01-01");

    cy.getByTestId("edit end date").click();
    cy.getByTestId("change end date").type("2024-01-01");

    cy.getByTestId("change duration").click();

    cy.getByTestId("change duration").type("1000");

    cy.getByTestId("edit start date").click();

    cy.shouldShowAlert("error");
  });

  it("should change duration", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("change duration").click();

    cy.getByTestId("change duration").type("28");

    cy.getByTestId("edit start date").click();

    cy.shouldShowAlert("success");
  });

  it("should activate study", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("edit start date").click();
    cy.getByTestId("change start date").type("2023-01-01");

    cy.getByTestId("edit end date").click();
    cy.getByTestId("change end date").type("2024-01-01");

    cy.getByTestId("change duration").click();

    cy.getByTestId("change duration").type("28");

    cy.getByTestId("edit start date").click();

    cy.getByTestId("change isActive").click();

    cy.shouldShowAlert("success", "aktiv geändert");
  });

  it("should deactivate study", () => {
    cy.openStudyPage(study.id);

    cy.getByTestId("edit start date").click();
    cy.getByTestId("change start date").type("2023-01-01");

    cy.getByTestId("edit end date").click();
    cy.getByTestId("change end date").type("2024-01-01");

    cy.getByTestId("change duration").click();

    cy.getByTestId("change duration").type("28");

    cy.getByTestId("edit start date").click();

    cy.getByTestId("change isActive").click();

    cy.shouldShowAlert("success", "aktiv geändert");

    cy.getByTestId("change isActive").click();

    cy.shouldShowAlert("success", "aktiv geändert");
  });
});
