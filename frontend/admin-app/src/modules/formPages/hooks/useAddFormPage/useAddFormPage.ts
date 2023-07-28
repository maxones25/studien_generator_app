import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { getGetFormPagesKey } from "..";

export const useAddFormPage = () => {
  const studyId = useStudyId();
  const formId = useFormId();
  return useWriteRequest<any, string>(
    ({ headers }) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/pages`, {
        method: "POST",
        headers,
      }),
    {
      onSuccess: ({ queryClient, snackbar, variables }) => {
        queryClient.invalidateQueries(getGetFormPagesKey({ formId, studyId }));
        snackbar.showSuccess(`{{ page ${variables.title} created }}`);
      },
    }
  );
};
