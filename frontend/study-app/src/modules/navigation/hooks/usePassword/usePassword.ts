import { useQueryParams } from "@modules/core/hooks";

export const usePassword = () => {
  const params = useQueryParams();
  const password = params.get("password");
  if (password === null || typeof password !== "string") return "";
  return password;
};
