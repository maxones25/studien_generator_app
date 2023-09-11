import { FakeGroup } from "../../fakeData";

Cypress.Commands.add("createGroup", (studyId: string, group: FakeGroup) => {
  const accessToken = Cypress.env("directorAccessToken");
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/groups/create`,
      body: group,
      qs: {
        studyId,
      },
      auth: {
        bearer: accessToken,
      },
    })
    .its("body")
    .then((id) => {
      return id as string;
    });
});
