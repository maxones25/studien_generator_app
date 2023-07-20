describe("navigation", () => {
  it("should redirect to login page", () => {
    cy.visit("/");
    cy.getByTestId("login page").should("exist");
  });

  it("should open to tasks page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/");
      cy.getByTestId("tasks page").should("exist");
    });
  });

  it("should open to events page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/events");
      cy.getByTestId("events page").should("exist");
    });
  });

  it("should open to chat page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/chat");
      cy.getByTestId("chat page").should("exist");
    });
  });

  it("should logout", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/");
      cy.getByTestId("log-out-app-bar").click();
      cy.getByTestId("accept-logout").click();
      cy.getByTestId("login page");
    });
  });

  it("should go back to tasks page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/events");
      cy.getByTestId("go-back-app-bar").click();
      cy.getByTestId("tasks page");
    });
  });

  it("should go to chat page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/");
      cy.getByTestId("go-mail-app-bar").click();
      cy.getByTestId("chat page");
    });
  });

  it("should go to events page", () => {
    cy.fetchAccessToken("participant").then(() => {
      cy.visit("/");
      cy.getByTestId("add-event").click();
      cy.getByTestId("events page");
    });
  });
});
