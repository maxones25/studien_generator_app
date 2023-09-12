import fakeData from "../../../fakeData";

describe("search participant", () => {
  let studyId;
  let group;

  before(() => {
    return cy.fetchAccessToken("director");
  });

  beforeEach(() => {
    cy.createStudy(fakeData.study()).then((id) => {
      studyId = id;
      group = fakeData.group();
      for (let i = 1; i <= 6; i++) {
        cy.createParticipant(studyId, { number: "00" + i * 2 });
      }
      cy.setAccessToken("director");
    });
  });

  it("should find participant '004'", () => {
    cy.openParticipantsPage(studyId);

    cy.getByTestId("participants list").contains("002");
    cy.getByTestId("participants list").contains("004");
    cy.getByTestId("participants list").contains("006");

    cy.getByTestId("search participant").click();

    cy.getByTestId(`change search text`).type("4");

    cy.getByTestId("participants list").contains("004");
    cy.getByTestId("participants list").should("not.contain", "002");
    cy.getByTestId("participants list").should("not.contain", "006");
  });

  it("should close search", () => {
    cy.openParticipantsPage(studyId);

    cy.getByTestId("participants list").contains("002");
    cy.getByTestId("participants list").contains("004");
    cy.getByTestId("participants list").contains("006");

    cy.getByTestId("search participant").click();

    cy.getByTestId(`change search text`).type("4");

    cy.getByTestId("participants list").should("not.contain", "002");

    cy.getByTestId("close search participant").click();

    cy.getByTestId("participants list").contains("002");
  });

  it("should have multiple results", () => {
    cy.openParticipantsPage(studyId);

    cy.getByTestId("participants list").contains("002");
    cy.getByTestId("participants list").contains("004");
    cy.getByTestId("participants list").contains("006");

    cy.getByTestId("search participant").click();

    cy.getByTestId(`change search text`).type("2");

    cy.getByTestId("participants list").contains("002");
    cy.getByTestId("participants list").contains("012");
    cy.getByTestId("participants list").should("not.contain", "006");
  });
});
