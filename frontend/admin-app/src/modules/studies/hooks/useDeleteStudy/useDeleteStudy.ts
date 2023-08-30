import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { StudyFormData } from "@modules/studies/types";
import { getGetStudiesKey } from "..";

export const useDeleteStudy = () => {
  return useWriteRequest<StudyFormData, void>(
    ({ body: { id: studyId }, ...options }) =>
      apiRequest(`/studies/delete`, { ...options, method: "POST" , params: { studyId } }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetStudiesKey());
        return {
          text: "record deleted",
          params: {
            record: "study",
            name: variables.name,
          },
        };
      },
    }
  );
};
