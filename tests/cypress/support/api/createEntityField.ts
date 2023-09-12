import { FakeEntity, FakeEntityField } from "../../fakeData";

Cypress.Commands.add(
  "createEntityField",
  (studyId: string, entityId: string, field: FakeEntityField) => {
    const accessToken = Cypress.env("directorAccessToken");
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/entities/addField`,
        qs: {
          studyId,
          entityId,
        },
        body: field,
        auth: {
          bearer: accessToken,
        },
      })
      .its("body")
      .then(({ id }) => {
        return id as string;
      });
  }
);
