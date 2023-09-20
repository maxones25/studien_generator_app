import fakeData from "../../../../fakeData";

describe("set form config time dependent", () => {
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
        });
      });
    });
  });

  it("should set form config time dependent", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("add form config").click();
    cy.getByTestId(`form ${formId}`).click();
    cy.shouldShowAlert("success", "Formular");

    cy.get(`[data-testid="form config ${formData.name} TimeDependent"]`)
      .find(`[data-testid="change type"]`)
      .click();
    cy.shouldShowAlert("success", "zeitunabhängig");

    cy.get(`[data-testid="form config ${formData.name} TimeIndependent"]`)
      .find(`[data-testid="change type"]`)
      .click();
    cy.shouldShowAlert("success", "zeitabhängig");
  });

  it("should fail because form already time dependent", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("add form config").click();
    cy.getByTestId(`form ${formId}`).click();
    cy.shouldShowAlert("success", "Formular");

    cy.getByTestId("add form config").click();
    cy.getByTestId(`form ${formId}`).click();
    cy.shouldShowAlert("success", "Formular");

    cy.get(`[data-testid="form config ${formData.name} TimeIndependent"]`)
      .find(`[data-testid="change type"]`)
      .click();
    cy.shouldShowAlert("error", "schon zeitabhängig");
  });

  it("should open and close schedules", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("add form config").click();
    cy.getByTestId(`form ${formId}`).click();
    cy.shouldShowAlert("success", "Formular");

    const toggleSchedules = cy
      .get(`[data-testid="form config ${formData.name} TimeDependent"]`)
      .find(`[data-testid="toggle schedules"]`);

    toggleSchedules.trigger("mouseover");

    toggleSchedules.click();

    cy.getByTestId(`schedules card ${formId}`).should("be.visible");

    toggleSchedules.click();

    cy.getByTestId(`schedules card ${formId}`).should("not.be.visible");
  });
});
