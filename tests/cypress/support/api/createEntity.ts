import { FakeEntity } from "../../fakeData";

Cypress.Commands.add("createEntity", (studyId: string, entity: FakeEntity) => {
  const accessToken = Cypress.env("directorAccessToken");
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/entities/createEntity`,
      qs: {
        studyId,
      },
      body: entity,
      auth: {
        bearer: accessToken,
      },
    })
    .its("body")
    .then((id) => {
      return id as string;
    });
});
