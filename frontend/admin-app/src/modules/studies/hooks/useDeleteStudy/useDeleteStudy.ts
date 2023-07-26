import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { StudyFormData } from "@modules/studies/types";
import { getGetStudiesKey } from "..";

export const useDeleteStudy = () => {
  return useWriteRequest<StudyFormData, void>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${id}`, { method: "DELETE", ...options }),
    {
      onSuccess: ({ queryClient, snackbar }) => {
        queryClient.invalidateQueries(getGetStudiesKey());
        snackbar.showSuccess(`{{ study deleted }}`)
      },
    }
  );
};
