import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { StudyFormData } from "@modules/studies/types";
import { getGetStudiesKey } from "..";

export const useUpdateStudy = () => {
  return useWriteRequest<StudyFormData, void>(
    ({ body: { id, ...body }, ...options }) =>
      apiRequest(`/studies/${id}`, { method: "PUT", ...options, body }),
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
