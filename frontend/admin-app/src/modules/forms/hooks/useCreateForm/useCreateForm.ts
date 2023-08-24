import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormFormData } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetFormsKey } from "..";

export const useCreateForm = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<FormFormData, string>(
    (options) =>
      apiRequest(`/forms/create`, {
        ...options,
        method: "POST",
        params: { studyId },
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetFormsKey({ studyId }));
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
