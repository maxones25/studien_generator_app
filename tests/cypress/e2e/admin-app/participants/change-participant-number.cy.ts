import fakeData from "../../../fakeData";

describe("change participant number", () => {
  let studyId;
  let participantId;
  let participant;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
      participant = fakeData.participant();
      cy.createParticipant(studyId, participant).then((id) => {
        participantId = id;
        cy.setAccessToken("director");
      });
    });
  });

  it("should change participant number", () => {
    const newNumber = fakeData.participant().number;

    cy.openParticipantPage(studyId, participantId);

    cy.getByTestId("edit number").click();

    cy.getByTestId("change number").clear();
    cy.getByTestId("change number").type(newNumber + "\n");

    cy.shouldShowAlert("success");

    cy.getByTestId("number").should("contain", newNumber);
    cy.getByTestId("number").should("not.contain", participant.number);

    cy.getByTestId("participants list").contains(newNumber);
    cy.getByTestId("participants list").should(
      "not.contain",
      participant.number
    );
  });

  it("should fail because number is empty", () => {
    cy.openParticipantPage(studyId, participantId);

    cy.getByTestId("edit number").click();

    cy.getByTestId("change number").clear();
    cy.getByTestId("change number").type("\n");

    cy.getByTestId("number").should("contain", participant.number);
    cy.getByTestId("participants list").should("contain", participant.number);
  });

  it("should fail because number already exists", () => {
    const data = fakeData.participant();

    cy.createParticipant(studyId, data);

    cy.openParticipantPage(studyId, participantId);

    cy.getByTestId("edit number").click();

    cy.getByTestId("change number").clear();
    cy.getByTestId("change number").type(data.number + "\n");

    cy.shouldShowAlert("error", "Fehler");

    cy.getByTestId("number").should("contain", participant.number);
    cy.getByTestId("participants list").should("contain", participant.number);
  });
});
