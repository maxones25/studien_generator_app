import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { ParticipantInfo } from "@modules/settings/types";

export interface UseGetParticipantInfoOptions {}

export const getGetParticipantInfoKey = () => ["getParticipantInfo"];

export const useGetParticipantInfo = () => {
  return useReadRequest<ParticipantInfo>(getGetParticipantInfoKey(), (options) =>
    apiRequest(`/auth/participant`, { ...options }),
    {
      staleTime: 1000*60*60
    }
  );
}