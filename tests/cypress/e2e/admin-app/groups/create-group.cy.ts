import fakeData from "../../../fakeData";

describe("create group", () => {
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

  it("should create a group", () => {
    cy.openGroupsPage(studyId);

    const group = fakeData.group();

    cy.getByTestId("open group input").click();

    cy.getByTestId(`change group text`).type(group.name + "\n");

    cy.shouldShowAlert("success", "erstellt");

    cy.getByTestId("groups page").contains(group.name);
  });

  it("should fail because name is empty", () => {
    cy.openGroupsPage(studyId);

    const group = fakeData.group();

    cy.getByTestId("open group input").click();

    cy.getByTestId(`change group text`).type("\n");

    cy.shouldShowAlert("error", "nicht leer");

    cy.getByTestId("groups page").should("not.contain", group.name);
  });

  it("should fail because name already exists", () => {
    cy.openGroupsPage(studyId);

    const group = fakeData.group();

    cy.getByTestId("open group input").click();
    cy.getByTestId(`change group text`).type(group.name + "\n");
    cy.shouldShowAlert("success", "erstellt");

    cy.getByTestId("groups page").contains(group.name);

    cy.getByTestId("open group input").click();
    cy.getByTestId(`change group text`).type(group.name + "\n");
    cy.shouldShowAlert("error");
  });
});
