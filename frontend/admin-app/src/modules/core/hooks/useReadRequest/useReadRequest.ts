import { useAccessTokenContext } from "@modules/auth/contexts";
import { ReadQueryFunction } from "@modules/core/types";
import { RequestHeader } from "@modules/core/utils";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

export const generateQueryKey =
  <T extends Record<string, any>>(key: string) =>
  (deps: T) => {
    const filteredDeps = Object.keys(deps)
      .filter((key) => Boolean(deps[key]))
      .reduce<Record<string, any>>((obj, key) => {
        obj[key] = deps[key];
        return obj;
      }, {});
    return [key, filteredDeps];
  };

export type UseReadRequestResult<Result> = UseQueryResult<Result, unknown>;

export interface UseReadRequestOptions<Result>
  extends UseQueryOptions<Result> {}

export const useReadRequest = <Result>(
  key: QueryKey,
  queryFunc: ReadQueryFunction<Result>,
  options?: UseReadRequestOptions<Result>
): UseReadRequestResult<Result> => {
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
    { refetchOnWindowFocus: false, ...options }
  );
};
