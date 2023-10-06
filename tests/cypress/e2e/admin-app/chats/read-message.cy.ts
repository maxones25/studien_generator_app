import fakeData, { FakeDirector } from "../../../fakeData";
import testData from "../../../testData";

describe("read message", () => {
  let studyId;
  let participant;
  let director: FakeDirector;

  before(() => {
    director = fakeData.director();
    cy.createDirector(director).then((directorId) => {
      cy.fetchAccessToken("director", director.email, director.password);
      cy.setAccessToken("director");

      cy.createStudy(fakeData.study()).then((id) => {
        studyId = id;
        participant = fakeData.participant();

        cy.apiAddMember(studyId, testData.director.id, "employee");

        cy.createParticipant(studyId, participant).then((id) => {
          participant.id = id;
          cy.setAccessToken("director");
        });
      });
    });
  });

  it("should read message", () => {
    cy.openChatsPage(studyId);

    cy.getByTestId("chats page").contains(participant.number).click();

    const message = fakeData.message();

    cy.getByTestId("write message").type(message + "\n");

    cy.getByTestId("chat page").contains(message);

    cy.contains("abmelden").click();

    cy.fetchAccessToken("director");
    cy.setAccessToken("director");

    cy.openChatsPage(studyId);

    cy.getByTestId("chats page")
      .findByTestId("unread messages")
      .should("exist")
      .contains("1");
    cy.getByTestId("menu drawer")
      .findByTestId("unread messages")
      .should("exist")
      .contains("1");

    cy.getByTestId("chats page").contains(participant.number).click();

    cy.getByTestId("chats page")
      .findByTestId("unread messages")
      .should("not.contain", "1");

    cy.getByTestId("menu drawer")
      .findByTestId("unread messages")
      .should("not.contain", "1");
  });
});
