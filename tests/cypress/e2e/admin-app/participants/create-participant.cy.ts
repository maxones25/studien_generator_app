import fakeData, { FakeParticipant } from "../../../fakeData";

describe("delete participant", () => {
  let studyId: string;
  let participantId: string;
  let participant: FakeParticipant;

  before(() => {
    cy.fetchAccessToken("director");

    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
    });
  });

  beforeEach(() => {
    participant = fakeData.participant();

    cy.createParticipant(studyId, participant).then((id) => {
      participantId = id;
      cy.setAccessToken("director");
    });
  });

  it("should create a participant", () => {
    const participant = fakeData.participant();

    cy.openParticipantsPage(studyId);

    cy.getByTestId("add participant").click();

    cy.getByTestId(`change participant text`).type(participant.number);

    cy.getByTestId(`submit participant`).click();

    cy.shouldShowAlert("success");

    cy.getByTestId("participants page").contains(participant.number);
  });

  it("should cancel create a participant", () => {
    const participant = fakeData.participant();

    cy.openParticipantsPage(studyId);

    cy.getByTestId("add participant").click();

    cy.getByTestId(`change participant text`).type(participant.number);

    cy.getByTestId(`cancel participant`).click();
  });
});
