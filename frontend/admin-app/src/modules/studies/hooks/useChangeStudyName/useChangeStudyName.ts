import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { getGetStudiesKey, getGetStudyKey } from "..";

export const useChangeStudyName = () => {
  return useWriteRequest<{ id: string; name: string }, void>(
    ({ body: { id: studyId, name }, ...options }) =>
      apiRequest(`/studies/changeName`, {
        ...options,
        method: "POST",
        params: { studyId },
        body: { name },
      }),
    {
      onSuccess: ({ queryClient, variables: study }) => {
        queryClient.invalidateQueries(getGetStudiesKey());
        queryClient.invalidateQueries(getGetStudyKey({ studyId: study.id }));
        return {
          text: "record updated",
          params: {
            record: "study",
            name: study.name,
          },
        };
      },
    }
  );
};
