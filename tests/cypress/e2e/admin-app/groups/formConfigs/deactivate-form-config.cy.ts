import fakeData from "../../../../fakeData";

describe("deactivate form config", () => {
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

  it("should deactivate form config", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("add form config").trigger("mouseover");

    cy.contains("Formular hinzufügen");

    cy.getByTestId("add form config").click();

    cy.contains(formData.name).click();

    cy.shouldShowAlert("success", "Formular");

    cy.getByTestId(`form config ${formData.name} TimeDependent`)
      .should("exist")
      .getByTestId("change isActive")
      .click();

    cy.shouldShowAlert("success", "aktiviert");

    cy.getByTestId(`form config ${formData.name} TimeDependent`)
      .should("exist")
      .getByTestId("change isActive")
      .click();

    cy.shouldShowAlert("success", "deaktiviert");
  });
});
