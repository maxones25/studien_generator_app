Cypress.Commands.add(
  "apiAddMember",
  (studyId: string, directorId: string, role: string) => {
    const accessToken = Cypress.env("directorAccessToken");
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/members/add`,
        qs: {
          directorId,
          studyId,
        },
        auth: {
          bearer: accessToken,
        },
        body: {
          role,
        },
      })
      .its("body");
  }
);
