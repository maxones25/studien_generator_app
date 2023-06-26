import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { StudyFormData } from "@modules/studies/types";
import { useQueryClient } from "react-query";
import { getGetStudiesKey } from "..";

export const useUpdateStudy = () => {
  const queryClient = useQueryClient();

  return useWriteRequest<StudyFormData, void>(
    ({ body: { id, ...body }, ...options }) =>
      apiRequest(`/studies/${id}`, { method: "PUT", ...options, body }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getGetStudiesKey());
      },
    }
  );
};
