import fakeData from "../../../../fakeData";

describe("set form config time independent", () => {
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

  it("should set form config time independent", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("add form config").trigger("mouseover");

    cy.contains("Formular hinzufügen");

    cy.getByTestId("add form config").click();

    cy.contains(formData.name).click();

    cy.shouldShowAlert("success", "Formular");

    cy.getByTestId(`form config ${formData.name} TimeDependent`)
      .should("exist")
      .getByTestId("change type")
      .click();

    cy.shouldShowAlert("success");

    cy.getByTestId(`form config ${formData.name} TimeIndependent`).should(
      "exist"
    );
  });

  it("should fail because form already time dependent", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("add form config").click();
    cy.getByTestId(`form ${formId}`).click();
    cy.shouldShowAlert("success", "Formular");

    cy.getByTestId("add form config").click();
    cy.getByTestId(`form ${formId}`).click();
    cy.shouldShowAlert("success", "Formular");

    cy.get(`[data-testid="form config ${formData.name} TimeDependent"]`)
      .find(`[data-testid="change type"]`)
      .click();
    cy.shouldShowAlert("error", "schon zeitunabhängig");
  });
});
