import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Director } from "@modules/directors/types";
import { getGetDirectorsKey } from "..";

export const useResetPassword = () => {
  return useWriteRequest<{ director: Director; password: string }, number>(
    ({ body: { director, password }, ...options }) =>
      apiRequest(`/directors/resetPassword`, {
        ...options,
        method: "POST",
        params: { directorId: director.id },
        body: { password },
      }),
    {
      onSuccess({ queryClient }) {
        queryClient.invalidateQueries(getGetDirectorsKey({ deleted: true }));
        queryClient.invalidateQueries(getGetDirectorsKey({ deleted: false }));

        return {
          text: "password changed",
          params: {},
        };
      },
    }
  );
};
