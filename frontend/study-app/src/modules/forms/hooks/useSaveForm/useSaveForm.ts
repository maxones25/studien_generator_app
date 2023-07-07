import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export interface UseSaveFormOptions {}

export const useSaveForm = (options? : UseSaveFormOptions) => {
  return useWriteRequest<unknown, unknown>((options) =>
    apiRequest(`/`, { method: "POST", ...options }), {
      
    }
  );
}