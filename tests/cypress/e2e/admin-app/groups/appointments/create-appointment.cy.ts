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

  it("should fail subject is missing", () => {
    cy.openGroupPage(studyId, groupId);

    const appointment = fakeData.appointment();

    cy.getByTestId("add appointment").click();

    cy.getByTestId("change startDate").type(appointment.startDate);
    cy.getByTestId("change startTime").type(appointment.startTime);
    cy.getByTestId("change endDate").type(appointment.endDate);
    cy.getByTestId("change endTime").type(appointment.endTime);

    cy.getByTestId("submit appointment form").click();

    cy.getByTestId("change subject").contains("Bitte Betreff eingeben");
  });

  it("should fail startDate is missing", () => {
    cy.openGroupPage(studyId, groupId);

    const appointment = fakeData.appointment();

    cy.getByTestId("add appointment").click();

    cy.getByTestId("change subject").type(appointment.subject);
    // cy.getByTestId("change startDate").type(appointment.startDate);
    cy.getByTestId("change startTime").type(appointment.startTime);
    cy.getByTestId("change endDate").type(appointment.endDate);
    cy.getByTestId("change endTime").type(appointment.endTime);

    cy.getByTestId("submit appointment form").click();

    cy.getByTestId("change startDate").contains("Bitte Startdatum eingeben");
  });

  it("should fail startTime is missing", () => {
    cy.openGroupPage(studyId, groupId);

    const appointment = fakeData.appointment();

    cy.getByTestId("add appointment").click();

    cy.getByTestId("change subject").type(appointment.subject);
    cy.getByTestId("change startDate").type(appointment.startDate);
    // cy.getByTestId("change startTime").type(appointment.startTime);
    cy.getByTestId("change endDate").type(appointment.endDate);
    cy.getByTestId("change endTime").type(appointment.endTime);

    cy.getByTestId("submit appointment form").click();

    cy.getByTestId("change startTime").contains("Bitte Startzeit eingeben");
  });

  it("should fail endDate is missing", () => {
    cy.openGroupPage(studyId, groupId);

    const appointment = fakeData.appointment();

    cy.getByTestId("add appointment").click();

    cy.getByTestId("change subject").type(appointment.subject);
    cy.getByTestId("change startDate").type(appointment.startDate);
    cy.getByTestId("change startTime").type(appointment.startTime);
    // cy.getByTestId("change endDate").type(appointment.endDate);
    cy.getByTestId("change endTime").type(appointment.endTime);

    cy.getByTestId("submit appointment form").click();

    cy.getByTestId("change endDate").contains("Bitte Enddatum eingeben");
  });

  it("should fail endTime is missing", () => {
    cy.openGroupPage(studyId, groupId);

    const appointment = fakeData.appointment();

    cy.getByTestId("add appointment").click();

    cy.getByTestId("change subject").type(appointment.subject);
    cy.getByTestId("change startDate").type(appointment.startDate);
    cy.getByTestId("change startTime").type(appointment.startTime);
    cy.getByTestId("change endDate").type(appointment.endDate);
    // cy.getByTestId("change endTime").type(appointment.endTime);

    cy.getByTestId("submit appointment form").click();

    cy.getByTestId("change endTime").contains("Bitte Endzeit eingeben");
  });

  it("should fail endDate before startDate", () => {
    cy.openGroupPage(studyId, groupId);

    const appointment = fakeData.appointment();

    cy.getByTestId("add appointment").click();

    cy.getByTestId("change subject").type(appointment.subject);
    cy.getByTestId("change startDate").type("2023-02-01");
    cy.getByTestId("change startTime").type("20:00");
    cy.getByTestId("change endDate").type("2023-01-31");
    cy.getByTestId("change endTime").type("21:00");

    cy.getByTestId("submit appointment form").click();

    cy.getByTestId("appointment form").contains(
      "Startzeitpunkt muss vor dem Endzeitpunkt liegen"
    );
  });

  it("should fail endTime before startTime", () => {
    cy.openGroupPage(studyId, groupId);

    const appointment = fakeData.appointment();

    cy.getByTestId("add appointment").click();

    cy.getByTestId("change subject").type(appointment.subject);
    cy.getByTestId("change startDate").type("2023-02-01");
    cy.getByTestId("change startTime").type("14:00");
    cy.getByTestId("change endDate").type("2023-02-01");
    cy.getByTestId("change endTime").type("13:00");

    cy.getByTestId("submit appointment form").click();

    cy.getByTestId("appointment form").contains(
      "Startzeitpunkt muss vor dem Endzeitpunkt liegen"
    );
  });
});
