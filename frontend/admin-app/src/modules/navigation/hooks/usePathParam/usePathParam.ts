import { useParams } from "react-router-dom";

export const usePathParam = (name: string) => {
  const params = useParams();

  const value = params[name];

  if (typeof value !== "string") throw new Error(`${name} not found`);

  return value;
};
