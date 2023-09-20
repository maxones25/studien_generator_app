import fakeData from "../../../../../fakeData";

describe("add schedule", () => {
  let studyId: string;
  let groupId: string;
  let formId: string;
  let formData: any;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    return cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
      cy.createGroup(studyId, fakeData.group()).then((id) => {
        groupId = id;
        formData = fakeData.form();
        cy.createForm(studyId, formData).then((id) => {
          formId = id;
          cy.setAccessToken("director");

          cy.openGroupPage(studyId, groupId);

          cy.getByTestId("add form config").click();
          cy.getByTestId(`form ${formId}`).click();
          cy.shouldShowAlert("success", "Formular");

          cy.getByTestId(`form config ${formData.name} TimeDependent`)
            .findByTestId(`toggle schedules`)
            .click();
        });
      });
    });
  });

  it("should add fix daily schedule", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Day`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("3");

    cy.getByTestId("add time").click();

    cy.getByTestId("time 0").type("08:00");

    cy.getByTestId("submit schedule form").click();

    cy.shouldShowAlert("success", "erstellt");

    cy.contains("alle 3 Tage");
    cy.contains("08:00");
  });

  it("should add fix weekly schedule", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Week`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("2");

    cy.getByTestId("select monday").click();
    cy.getByTestId("select wednesday").click();
    cy.getByTestId("select friday").click();

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("18:00");
    cy.getByTestId("add time").click();
    cy.getByTestId("time 1").type("18:30");

    cy.getByTestId("submit schedule form").click();

    cy.shouldShowAlert("success", "erstellt");

    cy.contains("Mo, Mi, Fr");
    cy.contains("alle 2 Wochen");
    cy.contains("18:00");
    cy.contains("18:30");
  });

  it("should add fix monthly schedule", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Month`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("2");

    cy.getByTestId("select 1").click();
    cy.getByTestId("select 8").click();
    cy.getByTestId("select 15").click();

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("12:30");

    cy.getByTestId("submit schedule form").click();

    cy.shouldShowAlert("success", "erstellt");

    cy.contains("am 1, 8, 15 des Monats");
    cy.contains("alle 2 Monate");
    cy.contains("12:30");
  });

  it("should add flexible weekly schedule", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Flexible`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Week`).click();

    cy.getByTestId("change amount").clear();
    cy.getByTestId("change amount").type("3");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("11:59");

    cy.getByTestId("submit schedule form").click();

    cy.shouldShowAlert("success", "erstellt");

    cy.contains("3 mal wöchentlich");
    cy.contains("11:59");
  });

  it("should add flexible monthly schedule", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Flexible`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Month`).click();

    cy.getByTestId("change amount").clear();
    cy.getByTestId("change amount").type("8");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("07:40");
    cy.getByTestId("add time").click();
    cy.getByTestId("time 1").type("08:50");
    cy.getByTestId("add time").click();
    cy.getByTestId("time 2").type("19:20");

    cy.getByTestId("submit schedule form").click();

    cy.shouldShowAlert("success", "erstellt");

    cy.contains("8 mal monatlich");
    cy.contains("07:40");
    cy.contains("08:50");
    cy.contains("19:20");
  });

  it("should add postponable schedule", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Day`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("5");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("07:40");

    cy.getByTestId("change postpone").click();

    cy.getByTestId("change postpone.times").type("2");
    cy.getByTestId("change postpone.duration").type("1");

    cy.getByTestId("submit schedule form").click();

    cy.shouldShowAlert("success", "erstellt");

    cy.getByTestId("show info").trigger("mouseover");
  });

  it("should add restricted schedule", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Day`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("5");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("07:40");

    cy.getByTestId("change restrict").click();

    cy.getByTestId("change restrict.before").type("3");
    cy.getByTestId("change restrict.after").type("6");

    cy.getByTestId("submit schedule form").click();

    cy.shouldShowAlert("success", "erstellt");

    cy.getByTestId("show info").trigger("mouseover");
    cy.contains("beschränkt");
  });

  it("should fail because frequency is zero", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Day`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("0");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("07:40");

    cy.getByTestId("submit schedule form").click();

    cy.contains("Bitte min. 1 eingeben");
  });

  it("should fail because amount is zero", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Flexible`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Week`).click();

    cy.getByTestId("change amount").clear();
    cy.getByTestId("change amount").type("0");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("07:40");

    cy.getByTestId("submit schedule form").click();

    cy.contains("Bitte min. 1 eingeben");
  });

  it("should fail because postpone times is zero", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Day`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("5");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("07:40");

    cy.getByTestId("change postpone").click();

    cy.getByTestId("change postpone.times").type("0");
    cy.getByTestId("change postpone.duration").type("1");

    cy.getByTestId("submit schedule form").click();

    cy.contains("Bitte min. 1 eingeben");
  });

  it("should fail because postpone duration is zero", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Day`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("5");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("07:40");

    cy.getByTestId("change postpone").click();

    cy.getByTestId("change postpone.times").type("1");
    cy.getByTestId("change postpone.duration").type("0");

    cy.getByTestId("submit schedule form").click();

    cy.contains("Bitte min. 1 eingeben");
  });

  it("should fail because restrict before is negative", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Day`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("5");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("07:40");

    cy.getByTestId("change restrict").click();

    cy.getByTestId("change restrict.before").type("-1");
    cy.getByTestId("change restrict.after").type("8");

    cy.getByTestId("submit schedule form").click();

    cy.contains("Bitte min. 0 eingeben");
  });

  it("should fail because restrict after is negative", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Day`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("5");

    cy.getByTestId("add time").click();
    cy.getByTestId("time 0").type("07:40");

    cy.getByTestId("change restrict").click();

    cy.getByTestId("change restrict.before").type("8");
    cy.getByTestId("change restrict.after").type("-1");

    cy.getByTestId("submit schedule form").click();

    cy.contains("Bitte min. 0 eingeben");
  });

  it("should fail because no times were added", () => {
    cy.getByTestId("add schedule").click();

    cy.getByTestId("schedule form").findByTestId("change type").click();
    cy.getByTestId(`change type option Fix`).click();

    cy.getByTestId("schedule form").findByTestId("change period").click();
    cy.getByTestId(`change period option Day`).click();

    cy.getByTestId("change frequency").clear();
    cy.getByTestId("change frequency").type("3");

    cy.getByTestId("submit schedule form").click();

    cy.contains("Bitte Zeiten eingeben");
  });
});
