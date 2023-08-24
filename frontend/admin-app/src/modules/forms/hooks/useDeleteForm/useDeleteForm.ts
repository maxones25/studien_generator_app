import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormFormData } from "@modules/forms/types";
import { getGetFormsKey } from "..";
import { useStudyId } from "@modules/navigation/hooks";

export const useDeleteForm = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<FormFormData, number>(
    ({ body: { id: formId }, ...options }) =>
      apiRequest(`/forms/delete`, {
        ...options,
        method: "POST",
        params: { formId, studyId },
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetFormsKey({ studyId }));
        return {
          text: "record deleted",
          params: {
            name: variables.name,
            record: "form",
          },
        };
      },
    }
  );
};
