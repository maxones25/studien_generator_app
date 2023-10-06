import testData from "../../testData";

Cypress.Commands.add(
  "fetchAccessToken",
  (type: "director" | "participant", user?: string, password?: string) => {
    if (type === "director") {
      return cy
        .request({
          method: "POST",
          url: `${Cypress.env("apiUrl")}/auth/login`,
          body: {
            email: user ? user : testData.director.email,
            password: password ? password : testData.director.password,
          },
        })
        .its("body")
        .then(({ accessToken }) => {
          Cypress.env("directorAccessToken", accessToken);
          cy.setLocalStorage("accessToken", JSON.stringify(accessToken));
          cy.saveLocalStorage();
        });
    } else if (type === "participant") {
      return cy
        .request({
          method: "POST",
          url: `${Cypress.env("apiUrl")}/auth/login`,
          body: {
            id: testData.participant.id,
            password: testData.participant.password,
          },
        })
        .its("body")
        .then(({ accessToken }) => {
          Cypress.env("participantAccessToken", accessToken);
          cy.setLocalStorage("accessToken", JSON.stringify(accessToken));
          cy.saveLocalStorage();
        });
    }
  }
);
