import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Event } from "@modules/events/types";

export interface UseGetEventsOptions {}

export const getGetEventsKey = () => ["getEvents"];

export const useGetEvents = (options? : UseGetEventsOptions) => {
  return useReadRequest<Event[]>(getGetEventsKey(), (options) =>
  apiRequest(`/forms/time/independent`, { ...options })
  );
}