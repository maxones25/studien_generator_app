import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { getGetStudyKey } from "..";
import { Study } from "@modules/studies/types";

export const useStartStudy = () => {
  return useWriteRequest<Study, string>(
    ({body: { id }, ...options}) =>
      apiRequest(`/studies/${id}/startStudy`, {
        ...options,
        method: "POST",
        body: {},
      }),
    {
      onSuccess({ queryClient, variables: study, data: date }) {
        queryClient.invalidateQueries(getGetStudyKey({ studyId: study.id }));
        return {
          text: "study started",
          params: {
            name: study.name,
            date,
          },
        };
      },
    }
  );
};
