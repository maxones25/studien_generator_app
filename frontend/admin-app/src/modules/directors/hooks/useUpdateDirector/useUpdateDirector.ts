import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { UpdateDirectorData } from "@modules/directors/types";
import { getGetDirectorsKey } from "..";

export const useUpdateDirector = () => {
  return useWriteRequest<UpdateDirectorData, number>(
    ({ body: { id: directorId, ...body }, ...options }) =>
      apiRequest(`/directors/update`, {
        ...options,
        method: "POST",
        body,
        params: { directorId },
      }),
    {
      onSuccess({ queryClient, variables: { email } }) {
        queryClient.invalidateQueries(getGetDirectorsKey({ deleted: true }));
        queryClient.invalidateQueries(getGetDirectorsKey({ deleted: false }));

        return {
          text: "record updated",
          params: {
            record: "director",
            name: email,
          },
        };
      },
    }
  );
};
