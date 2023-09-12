import fakeData from "../../../fakeData";

describe("change group name", () => {
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

  it("should change group name", () => {
    cy.openGroupPage(studyId, groupId);

    const newName = fakeData.group().name;

    cy.getByTestId("edit name").click();

    cy.getByTestId("change name").clear();
    cy.getByTestId("change name").type(newName + "\n");

    cy.shouldShowAlert("success", "geändert");

    cy.getByTestId("group name").should("not.contain", group.name);
    cy.getByTestId("group name").contains(newName);
  });

  it("should fail because name is empty", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("edit name").click();

    cy.getByTestId("change name").clear();
    cy.getByTestId("change name").type("\n");

    cy.getByTestId("group name").contains(group.name);
  });

  it.only("should fail because name already exists", () => {
    const otherGroup = fakeData.group();
    cy.createGroup(studyId, otherGroup);

    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("edit name").click();

    cy.getByTestId("change name").clear();
    cy.getByTestId("change name").type(otherGroup.name + "\n");

    cy.shouldShowAlert("error", "Fehler");

    cy.getByTestId("group name").should("not.contain", otherGroup.name);
    cy.getByTestId("group name").contains(group.name);
  });
});
