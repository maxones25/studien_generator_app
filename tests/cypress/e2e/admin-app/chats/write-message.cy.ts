import fakeData from "../../../fakeData";

describe("write message", () => {
  let studyId;
  let participant;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
      participant = fakeData.participant();
      cy.createParticipant(studyId, participant).then((id) => {
        participant.id = id;
        cy.setAccessToken("director");
      });
    });
  });

  it("should write message", () => {
    cy.openChatsPage(studyId);

    cy.getByTestId("chats page").contains(participant.number).click();

    const message = fakeData.message();

    cy.getByTestId("write message").type(message + "\n");

    cy.getByTestId("chat page").contains(message);
  });
});
