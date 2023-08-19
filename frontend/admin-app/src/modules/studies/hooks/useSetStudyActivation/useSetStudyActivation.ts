import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetStudyKey } from "..";

export const useSetStudyActivation = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<{ isActive: boolean }, unknown>(
    (options) =>
      apiRequest(`/studies/setActivation`, {
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
            name: "isActive",
          },
        };
      },
    }
  );
};
