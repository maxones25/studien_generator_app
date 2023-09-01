import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Director } from "@modules/members/types";

export const getGetMeKey = () => ["getMe"];

export const useGetMe = () => {
  return useReadRequest<Director>(getGetMeKey(), (options) =>
    apiRequest(`/directors/me`, { ...options })
  );
};
