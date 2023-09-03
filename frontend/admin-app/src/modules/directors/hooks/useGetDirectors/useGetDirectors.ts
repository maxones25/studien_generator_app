import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Director } from "@modules/directors/types";

export interface UseGetDirectorsOptions {
  deleted: boolean;
}
export const getGetDirectorsKey = (deps: { deleted: boolean }) => [
  "getDirectors",
  deps,
];

export const useGetDirectors = (options?: UseGetDirectorsOptions) => {
  const { deleted = false } = options || {};
  return useReadRequest<Director[]>(getGetDirectorsKey({ deleted }), (options) =>
    apiRequest(`/directors/getAll`, { ...options })
  );
};
