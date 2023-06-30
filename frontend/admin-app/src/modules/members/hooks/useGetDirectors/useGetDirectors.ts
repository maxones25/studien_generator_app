import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Director } from "@modules/members/types";

export const getGetDirectorsKey = () => ["getDirectors"];

export const useGetDirectors = () => {
  return useReadRequest<Director[]>(getGetDirectorsKey(), (options) =>
    apiRequest(`/directors`, { ...options })
  );
}