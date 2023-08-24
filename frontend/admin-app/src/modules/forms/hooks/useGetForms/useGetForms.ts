import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Form } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetFormsKey = (deps: { studyId: string }) => ["getForms", deps];

export const useGetForms = () => {
  const studyId = useStudyId()!;
  return useReadRequest<Form[]>(getGetFormsKey({ studyId }), (options) =>
    apiRequest(`/forms/getAll`, { ...options, params: { studyId } })
  );
};
