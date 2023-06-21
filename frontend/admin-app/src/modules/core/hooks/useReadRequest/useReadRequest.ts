import { useAccessTokenContext } from "@modules/auth/contexts";
import { ReadQueryFunction } from "@modules/core/types";
import { RequestHeader } from "@modules/core/utils";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";

export interface UseReadRequestOptions<Result>
  extends UseQueryOptions<Result> {}

export const useReadRequest = <Result>(
  key: QueryKey,
  queryFunc: ReadQueryFunction<Result>,
  options?: UseReadRequestOptions<Result>
) => {
  const accessToken = useAccessTokenContext();

  return useQuery<Result>(
    key,
    () => {
      const headers: RequestHeader = {};

      if (accessToken.isValid) {
        headers["Authorization"] = `Bearer ${accessToken.value}`;
      }

      return queryFunc({ headers });
    },
    options
  );
};
