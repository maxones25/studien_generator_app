import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Study } from "@modules/studies/types";
import { getGetStudiesKey, getGetStudyKey } from "..";

export const useDeleteStudy = () => {
  return useWriteRequest<{ study: Study; hardDelete: boolean }, void>(
    ({
      body: {
        study: { id: studyId },
        hardDelete,
      },
      ...options
    }) =>
      apiRequest(`/studies/delete`, {
        ...options,
        method: "POST",
        params: { studyId },
        body: { hardDelete },
      }),
    {
      onSuccess: ({ queryClient, variables: { study, hardDelete } }) => {
        queryClient.invalidateQueries(getGetStudiesKey());
        if (!hardDelete) {
          queryClient.invalidateQueries(getGetStudyKey({ studyId: study.id }));
        }
        const text = hardDelete ? "record deleted" : "record soft deleted";
        return {
          text,
          params: {
            record: "study",
            name: study.name,
          },
        };
      },
    }
  );
};
