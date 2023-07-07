import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Form } from "@modules/forms/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";

export const getGetFormKey = () => ["getForm"];

export const useGetForm = () => {
  const studyId = useStudyId();
  const entityId = useEntityId();

  return useReadRequest<Form>(getGetFormKey(), (options) =>
    apiRequest(`/studies/${studyId}/entities/${entityId}/forms`, {
      ...options,
    })
  );
};
