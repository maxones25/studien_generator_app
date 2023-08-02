import { usePathParam } from "..";

export const useGroupId = (required = true) => {
  return usePathParam("groupId", required);
};
