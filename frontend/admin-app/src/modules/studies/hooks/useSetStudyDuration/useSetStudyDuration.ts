import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetStudyKey } from "..";

export const useSetStudyDuration = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<{ duration: number }, void>(
    (options) =>
      apiRequest(`/studies/setDuration`, {
        ...options,
        method: "POST",
        params: {
          studyId,
        },
      }),
    {
      onSuccess({ queryClient }) {
        queryClient.invalidateQueries(getGetStudyKey({ studyId }));
        return {
          text: "set value",

          params: {
            name: "duration",
          },
        };
      },
    }
  );
};
