import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetStudyKey } from "..";

export const useSetStudyStartDate = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<{ date: string }, unknown>(
    (options) =>
      apiRequest(`/studies/setStartDate`, {
        ...options,
        method: "POST",
        params: { studyId },
      }),
    {
      onSuccess({ queryClient }) {
        queryClient.invalidateQueries(getGetStudyKey({ studyId }));
        return {
          text: "set value",
          params: {
            name: "startDate",
          },
        };
      },
    }
  );
};
