import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormPage } from "@modules/formPages/types";
import { getGetFormPagesKey } from "..";
import { useFormId, useStudyId } from "@modules/navigation/hooks";

export const useRemoveFormPage = () => {
  const studyId = useStudyId();
  const formId = useFormId();
  return useWriteRequest<FormPage, number>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/pages/${id}`, {
        method: "DELETE",
        ...options,
      }),
    {
      onSuccess: ({ queryClient, snackbar, variables }) => {
        queryClient.invalidateQueries(getGetFormPagesKey({ formId, studyId }));
        snackbar.showSuccess(`{{ page ${variables.title} deleted }}`);
      },
    }
  );
};
