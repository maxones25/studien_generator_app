/// <reference types="cypress" />

import "cypress-wait-until";
import "cypress-localstorage-commands";
import { FakeEntity, FakeStudy } from "../fakeData";

declare global {
  namespace Cypress {
    interface Chainable {
      fetchAccessToken(type: "director" | "participant"): Chainable<any>;
      setAccessToken(type: "director" | "participant"): Chainable<any>;
      shouldBeRelativePath(path: string): Chainable<any>;
      getByTestId(
        name: string,
        options?: Partial<
          Cypress.Loggable &
            Cypress.Timeoutable &
            Cypress.Withinable &
            Cypress.Shadow
        >
      ): Chainable<any>;
      createStudy(study: FakeStudy): Chainable<string>;
      createEntity(studyId: string, entity: FakeEntity): Chainable<string>;
      addMember(
        studyId: string,
        name: string,
        role: "admin" | "employee"
      ): Chainable<any>;
      openStudyPage(studyId: string): void;
      openEntitiesPage(studyId: string): void;
      openEntityPage(studyId: string, entityId: string): void;
      shouldShowAlert(type: "success" | "error", text?: string): void;
    }
  }
}

import "./api/fetchAccessToken";
import "./api/createStudy";
import "./api/createEntity";

import "./ui/shouldBeRelativePath";
import "./ui/getByTestId";
import "./ui/setAccessToken";
import "./ui/addMember";
import "./ui/shouldShowAlert";

import "./router/openStudyPage";
import "./router/openEntitiesPage";
import "./router/openEntityPage";
