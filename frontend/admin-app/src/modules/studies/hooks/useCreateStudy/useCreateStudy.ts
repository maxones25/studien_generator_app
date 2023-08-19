import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Study, StudyFormData } from "@modules/studies/types";
import { getGetStudiesKey } from "..";

export const useCreateStudy = () => {
  return useWriteRequest<StudyFormData, Study>(
    (options) => apiRequest(`/studies/create`, { method: "POST", ...options }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetStudiesKey());
        return {
          text: "record created",
          params: {
            record: "study",
            name: variables.name,
          },
        };
      },
    }
  );
};
