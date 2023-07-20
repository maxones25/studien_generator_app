import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Record } from "@modules/forms/types";

export interface UseSaveFormOptions {}

export const useSaveForm = (options? : UseSaveFormOptions) => {
  return useWriteRequest<Record, unknown>((options) =>
    apiRequest(`/record`, { method: "POST", ...options }), {
      
    }
  );
}