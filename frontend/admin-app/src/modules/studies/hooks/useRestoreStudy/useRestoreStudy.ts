import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetStudiesKey, getGetStudyKey } from "..";
import { Study } from "@modules/studies/types";

export const useRestoreStudy = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<Study, void>(
    (options) =>
      apiRequest(`/studies/restore`, {
        ...options,
        method: "POST",
        params: { studyId },
        body: {},
      }),
    {
      onSuccess({ queryClient, variables: study }) {
        queryClient.invalidateQueries(getGetStudiesKey());
        queryClient.invalidateQueries(getGetStudyKey({ studyId }));

        return {
          text: "record restored",
          params: {
            record: "study",
            name: study.name,
          },
        };
      },
    }
  );
};
