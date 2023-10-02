import fakeData from "../../../fakeData";

describe("create form", () => {
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

  it("should create form", () => {
    cy.openFormsPage(studyId);

    const form = fakeData.form();

    cy.getByTestId("create form").click();
    cy.getByTestId("change form text").type(form.name);
    cy.getByTestId("submit form").click();

    cy.shouldShowAlert("success", form.name);

    cy.getByTestId("forms page").contains(form.name);
  });

  it("should because name is empty", () => {
    cy.openFormsPage(studyId);

    const form = fakeData.form();

    cy.getByTestId("create form").click();
    cy.getByTestId("submit form").click();

    cy.shouldShowAlert("error", "nicht leer");
  });

  it("should because name already exists", () => {
    cy.openFormsPage(studyId);

    const form = fakeData.form();

    cy.getByTestId("create form").click();
    cy.getByTestId("change form text").type(form.name);
    cy.getByTestId("submit form").click();
    cy.shouldShowAlert("success", form.name);

    cy.getByTestId("create form").click();
    cy.getByTestId("change form text").type(form.name);
    cy.getByTestId("submit form").click();
    cy.shouldShowAlert("error");
  });
});
