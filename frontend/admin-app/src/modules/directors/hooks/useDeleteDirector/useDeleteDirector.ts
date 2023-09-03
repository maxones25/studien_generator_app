import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Director } from "@modules/directors/types";
import { getGetDirectorsKey } from "..";

export const useDeleteDirector = () => {
  return useWriteRequest<{ director: Director; hardDelete: boolean }, number>(
    ({ body: { director, hardDelete }, ...options }) =>
      apiRequest(`/directors/delete`, {
        ...options,
        method: "POST",
        params: { directorId: director.id },
        body: { hardDelete },
      }),
    {
      onSuccess({ queryClient, variables: { director, hardDelete } }) {
        queryClient.invalidateQueries(getGetDirectorsKey({ deleted: true }));
        queryClient.invalidateQueries(getGetDirectorsKey({ deleted: false }));
        const text = hardDelete ? "record deleted" : "record soft deleted";
        return {
          text,
          params: {
            record: "director",
            name: director.email,
          },
        };
      },
    }
  );
};
