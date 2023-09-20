import fakeData from "../../../../fakeData";

describe("add form config", () => {
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

  it("should add form config", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("add form config").trigger("mouseover");

    cy.contains("Formular hinzufügen");

    cy.getByTestId("add form config").click();

    cy.contains(formData.name).click();

    cy.shouldShowAlert("success", "Formular");

    cy.getByTestId(`form config ${formData.name} TimeDependent`)
      .should("exist")
      .contains(formData.name);

    cy.getByTestId(`form config ${formData.name} TimeDependent`)
      .should("exist")
      .contains("zeitabhängig");
  });

  it("should fail because no forms available", () => {
    cy.openGroupPage(studyId, groupId);

    cy.getByTestId("add form config").click();
    cy.getByTestId(`form ${formId}`).click();
    cy.shouldShowAlert("success", "Formular");

    cy.getByTestId("add form config").click();
    cy.getByTestId(`form ${formId}`).click();
    cy.shouldShowAlert("success", "Formular");

    cy.getByTestId(`form config ${formData.name} TimeDependent`)
      .should("exist")
      .contains("zeitabhängig");

    cy.getByTestId(`form config ${formData.name} TimeIndependent`)
      .should("exist")
      .contains("zeitunabhängig");

    cy.getByTestId("add form config container").trigger("mouseover");

    cy.contains("Alle Formulare wurden bereits hinzugefügt");
  });
});
