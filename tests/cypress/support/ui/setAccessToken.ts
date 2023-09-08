Cypress.Commands.add("setAccessToken", (type: "director" | "participant") => {
  const accessToken = Cypress.env(type + "AccessToken");
  cy.setLocalStorage("accessToken", JSON.stringify(accessToken));
  cy.saveLocalStorage();
});
