import fakeData from "../../../fakeData";

describe("start study for participant", () => {
  let studyId;
  let groupData;
  let groupId;
  let participantId;
  let participant;
  let entityId;
  let formId;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
      groupData = fakeData.group();
      cy.createGroup(studyId, groupData).then((id) => {
        groupId = id;
        participant = fakeData.participant();
        cy.createParticipant(studyId, participant).then((id) => {
          participantId = id;
          cy.createEntity(studyId, fakeData.entity()).then((id) => {
            entityId = id;
            cy.createForm(studyId, fakeData.form()).then((id) => {
              formId = id;
              cy.setAccessToken("director");
            });
          });
        });
      });
    });
  });

  it("should start study", () => {
    cy.openStudyPage(studyId);
    cy.getByTestId("edit start date").click();
    cy.getByTestId("change start date").type("2023-01-01");
    cy.getByTestId("edit end date").click();
    cy.getByTestId("change end date").type("2027-01-01");
    cy.getByTestId("change duration").click();
    cy.getByTestId("change duration").type("28");
    cy.getByTestId("edit start date").click();
    cy.getByTestId("change isActive").click();
    cy.shouldShowAlert("success", "aktiv geändert");

    cy.openFormPage(studyId, formId);
    cy.getByTestId("add entity").click();
    cy.getByTestId(entityId).click();

    cy.openGroupPage(studyId, groupId);
    cy.getByTestId("add form config").click();
    cy.getByTestId(`form ${formId}`).click();
    cy.getByTestId("change isActive").click();
    cy.getByTestId("change type").click();

    cy.openParticipantPage(studyId, participantId);
    cy.getByTestId("change group").click();
    cy.getByTestId(`change group option ${groupId}`).click();

    cy.getByTestId("participant page").contains(groupData.name);
    cy.getByTestId("open start study dialog").click();
    cy.getByTestId("change startDate").type("2024-01-01");
    cy.getByTestId("continue").click();
    cy.getByTestId("start study").click();
    cy.shouldShowAlert("success", "gestartet");
    
    cy.getByTestId("qr code page").should("be.visible")
  });
});
