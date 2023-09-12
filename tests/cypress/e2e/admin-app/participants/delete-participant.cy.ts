import fakeData, { FakeGroup, FakeParticipant } from "../../../fakeData";

describe("delete participant", () => {
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

  it("should hard delete participant", () => {
    cy.openParticipantPage(studyId, participantId);

    cy.getByTestId("participants list").should("contain", participant.number);

    cy.getByTestId("delete participant").trigger("mouseover");
    cy.contains("Proband löschen");
    cy.getByTestId("delete participant").click();

    cy.getByTestId("change target").type(participant.number);
    cy.getByTestId("change hardDelete").click();
    cy.getByTestId("confirm delete participant").click();

    cy.shouldShowAlert("success", "gelöscht");

    cy.getByTestId("participant page").should("not.exist");

    cy.getByTestId("participants page").should(
      "not.contain",
      participant.number
    );
  });

  it("should restore participant", () => {
    cy.openParticipantPage(studyId, participantId);

    cy.getByTestId("participants list").should("contain", participant.number);

    cy.getByTestId("delete participant").trigger("mouseover");
    cy.contains("Proband löschen");
    cy.getByTestId("delete participant").click();

    cy.getByTestId("change target").type(participant.number);
    cy.getByTestId("confirm delete participant").click();

    cy.shouldShowAlert("success", "gelöscht");

    cy.getByTestId("participant page").should("not.exist");

    cy.getByTestId("participants list").should("contain", participant.number);
    cy.getByTestId(`restore participant ${participantId}`).should("exist");
  });

  it.only("should not open a soft deleted participant", () => {
    cy.openParticipantPage(studyId, participantId);

    cy.getByTestId("participants list").should("contain", participant.number);

    cy.getByTestId("delete participant").trigger("mouseover");
    cy.contains("Proband löschen");
    cy.getByTestId("delete participant").click();

    cy.getByTestId("change target").type(participant.number);
    cy.getByTestId("confirm delete participant").click();

    cy.shouldShowAlert("success", "gelöscht");

    cy.getByTestId("participant page").should("not.exist");

    cy.getByTestId("participants list").should("contain", participant.number);
    cy.getByTestId(`restore participant ${participantId}`)
      .should("exist")
      .click({ force: true });

    cy.getByTestId("participant page").should("not.exist");
  });

  it("should soft delete participant", () => {
    cy.openParticipantPage(studyId, participantId);

    cy.getByTestId("participants list").should("contain", participant.number);

    cy.getByTestId("delete participant").trigger("mouseover");
    cy.contains("Proband löschen");
    cy.getByTestId("delete participant").click();

    cy.getByTestId("change target").type(participant.number);
    cy.getByTestId("confirm delete participant").click();

    cy.shouldShowAlert("success", "gelöscht");

    cy.getByTestId("participant page").should("not.exist");

    cy.getByTestId("participants list").should("contain", participant.number);
    cy.getByTestId(`restore participant ${participantId}`)
      .should("exist")
      .click();

    cy.shouldShowAlert("success");

    cy.getByTestId(`restore participant ${participantId}`).should("not.exist");
  });
});
