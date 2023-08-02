import { usePathParam } from "..";

export const usePageId = (required = true) => {
  return usePathParam("pageId", required);
};
