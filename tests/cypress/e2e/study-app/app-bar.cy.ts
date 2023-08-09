describe("app bar", () => {
  beforeEach(() => {
    cy.intercept('GET', '/dev-sw.js?dev-sw', {statusCode: 404});
  })

  it("should logout", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/");
      cy.getByTestId("menu-app-bar").click();
      cy.getByTestId("log-out-app-bar").click();
      cy.getByTestId("accept-logout").click();
      cy.getByTestId("login page").should("exist");;
    });
  });

  it("should go back to tasks page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/events");
      cy.getByTestId("go-back-app-bar").click();
      cy.getByTestId("tasks page").should("exist");;
    });
  });

  it("should go to chat page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/");
      cy.getByTestId("go-mail-app-bar").click();
      cy.getByTestId("chat page").should("exist");;
    });
  });

  it("should open to settings page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/");
      cy.getByTestId("menu-app-bar").click();
      cy.getByTestId("go-settings-app-bar").click();
      cy.getByTestId("settings page").should("exist");
    });
  });

  it("should open to calendar page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/");
      cy.getByTestId("go-calendar-app-bar").click();
      cy.getByTestId("calendar page").should("exist");
    });
  });
});
