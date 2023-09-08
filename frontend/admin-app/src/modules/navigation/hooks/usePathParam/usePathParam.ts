import { useParams } from "react-router-dom";

export const usePathParam = (name: string, required = true) => {
  const params = useParams();

  const value = params[name];

  if (required && typeof value !== "string") throw new Error(`${name} not found`);

  return value;
};
