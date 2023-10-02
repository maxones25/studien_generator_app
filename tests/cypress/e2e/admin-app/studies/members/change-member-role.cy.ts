import fakeData from "../../../../fakeData";

describe("change member role", () => {
  let study;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    study = fakeData.study();
    cy.createStudy(study).then((id) => {
      study.id = id;
      cy.setAccessToken("director");
    });
  });

  it("should change role from admin to employee", () => {
    cy.addMember(study.id, "Alice Smith", "admin");

    cy.getByTestId("select Alice Smith role").contains("Administrator");

    cy.getByTestId("select Alice Smith role").contains("Administrator").click();

    cy.getByTestId("select Alice Smith role option employee").click();

    cy.shouldShowAlert("success");
  });

  it("should change role from employee to admin", () => {
    cy.addMember(study.id, "Alice Smith", "employee");

    cy.getByTestId("select Alice Smith role").contains("Mitarbeiter");

    cy.getByTestId("select Alice Smith role").contains("Mitarbeiter").click();

    cy.getByTestId("select Alice Smith role option admin").click();

    cy.shouldShowAlert("success");
  });
});
