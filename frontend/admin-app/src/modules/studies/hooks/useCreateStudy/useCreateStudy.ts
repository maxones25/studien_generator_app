import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Study, StudyFormData } from "@modules/studies/types";
import { useQueryClient } from "react-query";
import { getGetStudiesKey } from "..";

export const useCreateStudy = () => {
  const queryClient = useQueryClient()

  return useWriteRequest<StudyFormData, Study>((options) =>
    apiRequest(`/studies`, { method: "POST", ...options }), {
      onSuccess: () => {
        queryClient.invalidateQueries(getGetStudiesKey())
      }
    }
  );
};
