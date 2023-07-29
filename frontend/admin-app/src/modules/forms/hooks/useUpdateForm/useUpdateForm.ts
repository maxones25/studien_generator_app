import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormFormData } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetFormsKey } from "..";

export const useUpdateForm = () => {
  const studyId = useStudyId();
  return useWriteRequest<FormFormData, number>(
    ({ body: { id, ...body }, ...options }) =>
      apiRequest(`/studies/${studyId}/forms/${id}`, {
        method: "PUT",
        body,
        ...options,
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetFormsKey());
        return {
          text: "record  updated",
          params: {
            record: "form",
            name: variables.name,
          },
        };
      },
    }
  );
};
