import fakeData from "../../../fakeData";

describe("delete group", () => {
  let studyId;
  let groupId;
  let group;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
      group = fakeData.group();
      cy.createGroup(studyId, group).then((id) => {
        groupId = id;
        cy.setAccessToken("director");
      });
    });
  });

  it("should hard delete a group", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("open delete group dialog").trigger("mouseover");

    cy.contains("Gruppe löschen");

    cy.getByTestId("open delete group dialog").click();

    cy.getByTestId("change target").type(group.name);

    cy.getByTestId("change hardDelete").click();

    cy.getByTestId("confirm delete group").click();

    cy.shouldShowAlert("success");

    cy.getByTestId("group page").should("not.exist");

    cy.getByTestId("groups page").should("not.contain", group.name);
  });

  it("should soft delete a group", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("open delete group dialog").trigger("mouseover");

    cy.contains("Gruppe löschen");

    cy.getByTestId("open delete group dialog").click();

    cy.getByTestId("change target").type(group.name);

    cy.getByTestId("confirm delete group").click();

    cy.shouldShowAlert("success");

    cy.getByTestId("group page").should("not.exist");

    cy.getByTestId("groups page").should("contain", group.name);

    cy.getByTestId(`restore group ${groupId}`).should("exist");
  });
});
