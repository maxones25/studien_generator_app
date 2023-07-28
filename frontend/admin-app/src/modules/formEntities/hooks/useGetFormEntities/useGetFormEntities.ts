import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormEntity } from "@modules/formEntities/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";

export const getGetFormEntitiesKey = (deps: {
  studyId: string;
  formId: string;
}) => ["getFormEntities", deps];

export const useGetFormEntities = () => {
  const studyId = useStudyId();
  const formId = useFormId();
  return useReadRequest<FormEntity[]>(
    getGetFormEntitiesKey({ studyId: studyId!, formId: formId! }),
    (options) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/entities`, { ...options })
  );
};
