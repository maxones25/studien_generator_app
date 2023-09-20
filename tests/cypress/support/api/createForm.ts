import { FakeForm } from "../../fakeData";

Cypress.Commands.add("createForm", (studyId: string, form: FakeForm) => {
  const accessToken = Cypress.env("directorAccessToken");
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/forms/create`,
      qs: {
        studyId,
      },
      body: form,
      auth: {
        bearer: accessToken,
      },
    })
    .its("body")
    .then((id) => {
      return id as string;
    });
});
