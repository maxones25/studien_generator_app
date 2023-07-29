import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormFormData } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetFormsKey } from "..";

export const useCreateForm = () => {
  const studyId = useStudyId();
  return useWriteRequest<FormFormData, string>(
    (options) =>
      apiRequest(`/studies/${studyId}/forms`, { method: "POST", ...options }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetFormsKey());
        return {
          text: "record created",
          params: {
            record: "form",
            name: variables.name,
          },
        };
      },
    }
  );
};
