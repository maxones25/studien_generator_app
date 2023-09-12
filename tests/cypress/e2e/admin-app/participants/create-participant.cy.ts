import fakeData from "../../../fakeData";

describe("create participant", () => {
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

  it.only("should create a participant", () => {
    const participant = fakeData.participant();

    cy.openParticipantsPage(studyId);

    cy.getByTestId("add participant").click();

    cy.getByTestId(`change participant text`).type(participant.number);

    cy.getByTestId(`submit participant`).click();

    cy.shouldShowAlert("success");

    cy.getByTestId("participants page").contains(participant.number)
  });

  it("should cancel create a participant", () => {
    const participant = fakeData.participant();

    cy.openParticipantsPage(studyId);

    cy.getByTestId("add participant").click();

    cy.getByTestId(`change participant text`).type(participant.number);

    cy.getByTestId(`cancel participant`).click();
  });
});
