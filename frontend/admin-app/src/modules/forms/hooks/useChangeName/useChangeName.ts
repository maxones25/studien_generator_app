import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormFormData } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetFormsKey } from "..";

export const useChangeName = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<FormFormData, number>(
    ({ body: { id: formId, ...body }, ...options }) =>
      apiRequest(`/forms/changeName`, {
        ...options,
        params: { studyId, formId },
        method: "POST",
        body,
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetFormsKey({ studyId }));
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
