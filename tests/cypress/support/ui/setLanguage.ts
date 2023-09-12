Cypress.Commands.add("setLanguage", (lang: "de" | "en") => {
  cy.setLocalStorage("lang", JSON.stringify(lang));
  cy.saveLocalStorage();
});
