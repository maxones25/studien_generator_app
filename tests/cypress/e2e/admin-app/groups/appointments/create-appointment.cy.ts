import fakeData from "../../../../fakeData";

describe("create appointment", () => {
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

  it("should add an appointment", () => {
    cy.openGroupPage(studyId, groupId);

    const appointment = fakeData.appointment();

    cy.getByTestId("add appointment").click();

    cy.getByTestId("change subject").type(appointment.subject);

    cy.getByTestId("change startDate").type(appointment.startDate);
    cy.getByTestId("change startTime").type(appointment.startTime);
    cy.getByTestId("change endDate").type(appointment.endDate);
    cy.getByTestId("change endTime").type(appointment.endTime);

    cy.getByTestId("submit appointment form").click();

    cy.shouldShowAlert("success");

    cy.getByTestId("submit appointment form").should("not.exist");

    cy.getByTestId("appointments card").contains(appointment.subject);
  });
});
