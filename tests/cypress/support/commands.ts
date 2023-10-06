/// <reference types="cypress" />

import "cypress-wait-until";
import "cypress-localstorage-commands";
import {
  FakeDirector,
  FakeEntity,
  FakeEntityField,
  FakeForm,
  FakeGroup,
  FakeParticipant,
  FakeStudy,
} from "../fakeData";

declare global {
  namespace Cypress {
    interface Chainable {
      fetchAccessToken(
        type: "director" | "participant",
        user?: string,
        password?: string
      ): Chainable<any>;
      createDirector(data: FakeDirector): Chainable<string>;
      setAccessToken(type: "director" | "participant"): Chainable<any>;
      setLanguage(lang: "de" | "en"): Chainable<any>;
      shouldBeRelativePath(path: string): Chainable<any>;
      getByTestId(
        name: string,
        options?: Partial<
          Cypress.Loggable &
            Cypress.Timeoutable &
            Cypress.Withinable &
            Cypress.Shadow
        >
      ): Chainable<JQuery<HTMLElement>>;
      findByTestId(
        name: string,
        options?: Partial<
          Cypress.Loggable &
            Cypress.Timeoutable &
            Cypress.Withinable &
            Cypress.Shadow
        >
      ): Chainable<JQuery<HTMLElement>>;
      createStudy(study: FakeStudy): Chainable<string>;
      apiAddMember(
        studyId: string,
        directorId: string,
        role: string
      ): Chainable<void>;
      createGroup(studyId: string, group: FakeGroup): Chainable<string>;
      createEntity(studyId: string, entity: FakeEntity): Chainable<string>;
      createForm(studyId: string, form: FakeForm): Chainable<string>;
      createParticipant(
        studyId: string,
        participant: FakeParticipant
      ): Chainable<string>;
      createEntityField(
        studyId: string,
        entityId: string,
        field: FakeEntityField
      ): Chainable<string>;
      addMember(
        studyId: string,
        name: string,
        role: "admin" | "employee"
      ): Chainable<any>;
      openStudyPage(studyId: string): void;
      openGroupsPage(studyId: string): void;
      openRecordsPage(studyId: string): void;
      openFormsPage(studyId: string): void;
      openFormPage(studyId: string, formId: string): void;
      openEntitiesPage(studyId: string): void;
      openParticipantsPage(studyId: string): void;
      openParticipantPage(studyId: string, participantId: string): void;
      openEntityPage(studyId: string, entityId: string): void;
      openGroupPage(studyId: string, groupId: string): void;
      openChatsPage(studyId: string): void;
      shouldShowAlert(type: "success" | "error", text?: string): void;
      selectOption(name: string, option: string): Chainable<any>;
    }
  }
}

import "./api/fetchAccessToken";
import "./api/createStudy";
import "./api/createGroup";
import "./api/createParticipant";
import "./api/createEntity";
import "./api/createEntityField";
import "./api/createForm";
import "./api/createDirector";
import "./api/addMember";

import "./ui/shouldBeRelativePath";
import "./ui/getByTestId";
import "./ui/findByTestId";
import "./ui/selectOption";
import "./ui/setAccessToken";
import "./ui/setLanguage";
import "./ui/addMember";
import "./ui/shouldShowAlert";

import "./router/openStudyPage";
import "./router/openEntitiesPage";
import "./router/openParticipantsPage";
import "./router/openParticipantPage";
import "./router/openEntityPage";
import "./router/openGroupsPage";
import "./router/openGroupPage";
import "./router/openRecordsPage";
import "./router/openFormsPage";
import "./router/openFormPage";
import "./router/openChatsPage";
