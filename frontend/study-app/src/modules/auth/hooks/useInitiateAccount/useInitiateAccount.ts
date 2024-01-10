import { useAccessTokenContext } from "@modules/auth/contexts";
import { InitiateAccountData } from "@modules/auth/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";


export const useInitiateAccount = () => {
  const accessToken = useAccessTokenContext();
  return useWriteRequest<InitiateAccountData, { accessToken: string }>(
    async (options) => {
      const res = await apiRequest<{ accessToken: string }>(
        `/auth`,
        {
          ...options,
          method: "PUT",
        }
      );

      if (typeof res.accessToken !== "string")
        throw new Error("accessToken invalid");

      return res;
    },
    {
      onSuccess: ({ queryClient, data: { accessToken: value } }) => {
        queryClient.invalidateQueries();
        accessToken.set(value);
      },
    }
  );
}