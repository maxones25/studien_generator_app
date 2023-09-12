import fakeData, { FakeGroup, FakeParticipant } from "../../../fakeData";

describe("change participant group", () => {
  let studyId: string;
  let participantId: string;
  let groupId: string;
  let group: FakeGroup;
  let participant: FakeParticipant;

  before(() => {
    cy.fetchAccessToken("director");
    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
      group = fakeData.group();
      cy.createGroup(studyId, group).then((id) => {
        groupId = id;
      });
    });
  });

  beforeEach(() => {
    participant = fakeData.participant();
    cy.createParticipant(studyId, participant).then((id) => {
      participantId = id;
      cy.setAccessToken("director");
    });
  });

  it("should change participant group", () => {
    cy.openParticipantPage(studyId, participantId);

    cy.getByTestId("change group").should("not.contain", group.name);

    cy.selectOption("group", groupId);

    cy.shouldShowAlert("success", "hinzugefügt");

    cy.getByTestId("change group").should("contain", group.name);
  });

  it.only("should remove participant group", () => {
    cy.openParticipantPage(studyId, participantId);

    cy.getByTestId("change group").should("not.contain", group.name);

    cy.selectOption("group", groupId);

    cy.shouldShowAlert("success", "hinzugefügt");

    cy.getByTestId("change group").should("contain", group.name);

    cy.selectOption("group", null);

    cy.shouldShowAlert("success", "entfernt");

    cy.getByTestId("change group").should("not.contain", group.name);
  });
});
