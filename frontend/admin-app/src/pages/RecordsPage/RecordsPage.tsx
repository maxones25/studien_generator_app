import { Page } from "@modules/core/components";
import { useNavigationHelper, useQueryParams } from "@modules/core/hooks";
import {
  RecordManager,
  RecordsManagerState,
} from "@modules/records/components";
import React from "react";

export interface RecordsPageProps {}

const RecordsPage: React.FC<RecordsPageProps> = () => {
  const navigate = useNavigationHelper();

  const params = useQueryParams();

  const entityId = params.get("entityId") ?? null;
  const formId = params.get("formId") ?? null;
  const groupId = params.get("groupId") ?? null;
  const participantId = params.get("participantId") ?? null;
  const columns = params.get("columns")?.split(",") ?? [];

  const state: RecordsManagerState = {
    entityId,
    formId,
    groupId,
    participantId,
    columns,
  };

  const handleChange = (data: Partial<RecordsManagerState>) => {
    const newState: RecordsManagerState = { ...state, ...data };
    const queryParams = Object.keys(newState)
      .filter((key) => (newState as any)[key])
      .map((key) => `${key}=${(newState as any)[key]}`)
      .join("&");

    if (queryParams !== "") {
      navigate.to(`?${queryParams}`);
    } else {
      navigate.to(``);
    }
  };

  return (
    <Page testId="records page" flex={1}>
      <RecordManager state={state} onStateChange={handleChange} />
    </Page>
  );
};

export default RecordsPage;
