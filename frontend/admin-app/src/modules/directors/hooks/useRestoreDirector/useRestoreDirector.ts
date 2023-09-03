import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Director } from "@modules/directors/types";
import { getGetDirectorsKey } from "..";

export const useRestoreDirector = () => {
  return useWriteRequest<Director, number>(
    ({ body: director, ...options }) =>
      apiRequest(`/directors/restore`, {
        ...options,
        method: "POST",
        params: { directorId: director.id },
      }),
    {
      onSuccess({ queryClient, variables: director }) {
        queryClient.invalidateQueries(getGetDirectorsKey({ deleted: true }));
        queryClient.invalidateQueries(getGetDirectorsKey({ deleted: false }));

        return {
          text: "record restored",
          params: {
            record: "director",
            name: director.email,
          },
        };
      },
    }
  );
};
