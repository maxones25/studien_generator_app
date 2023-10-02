import {  FakeParticipant } from "../../fakeData";

Cypress.Commands.add(
  "createParticipant",
  (studyId: string, participant: FakeParticipant) => {
    const accessToken = Cypress.env("directorAccessToken");
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/participants/create`,
        body: participant,
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
  }
);
