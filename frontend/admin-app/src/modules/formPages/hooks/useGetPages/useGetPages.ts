import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormPage } from "@modules/formPages/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";

export const getGetPagesKey = (deps: { studyId: string; formId: string }) => [
  "getPages",
  deps,
];

export const useGetPages = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;

  return useReadRequest<FormPage[]>(
    getGetPagesKey({ studyId, formId }),
    (options) =>
      apiRequest(`/forms/getPages`, { ...options, params: { studyId, formId } })
  );
};
