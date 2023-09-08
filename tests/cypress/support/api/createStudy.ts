import { FakeStudy } from "../../fakeData";

Cypress.Commands.add("createStudy", (study: FakeStudy) => {
  const accessToken = Cypress.env("directorAccessToken");
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/studies/create`,
      body: study,
      auth: {
        bearer: accessToken,
      },
    })
    .its("body")
    .then((id) => {
      return id as string;
    });
});
