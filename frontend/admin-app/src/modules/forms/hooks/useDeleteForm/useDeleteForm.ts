import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormFormData } from "@modules/forms/types";
import { getGetFormsKey } from "..";
import { useStudyId } from "@modules/navigation/hooks";

export const useDeleteForm = () => {
  const studyId = useStudyId();
  return useWriteRequest<FormFormData, number>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${studyId}/forms/${id}`, {
        method: "DELETE",
        ...options,
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetFormsKey());
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
