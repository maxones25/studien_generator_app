import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { StudyFormData } from "@modules/studies/types";
import { getGetStudiesKey } from "..";

export const useChangeStudyName = () => {
  return useWriteRequest<StudyFormData, void>(
    ({ body: { id: studyId, ...body }, ...options }) =>
      apiRequest(`/studies/changeName`, {
        ...options,
        method: "POST",
        body,
        params: { studyId },
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetStudiesKey());
        return {
          text: "record updated",
          params: {
            record: "study",
            name: variables.name,
          },
        };
      },
    }
  );
};
