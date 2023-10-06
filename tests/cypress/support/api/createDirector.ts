import fakeData, { FakeDirector } from "../../fakeData";
import testData from "../../testData";

Cypress.Commands.add("createDirector", (data: FakeDirector) => {
  const { activationPassword } = testData;
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/auth/signUp`,
      body: {
        ...data,
        activationPassword,
      },
    })
    .its("body");
});
