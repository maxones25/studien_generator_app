import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Study, StudyFormData } from "@modules/studies/types";
import { getGetStudiesKey } from "..";

export const useCreateStudy = () => {
  return useWriteRequest<StudyFormData, Study>((options) =>
    apiRequest(`/studies`, { method: "POST", ...options }), {
      onSuccess: ({ queryClient, snackbar }) => {
        queryClient.invalidateQueries(getGetStudiesKey())
        snackbar.showSuccess(`{{ study created }}`)
      }
    }
  );
};
