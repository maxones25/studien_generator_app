import { useQueryParams } from "@modules/core/hooks";

export const useId = () => {
  const params = useQueryParams();
  const id = params.get("id");
  if (id === null || typeof id !== "string") return "";
  return id;
};
