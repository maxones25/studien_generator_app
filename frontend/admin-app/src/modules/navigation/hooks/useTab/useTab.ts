import { useParams } from "react-router-dom";

export const useTab = () => {
  const { tab } = useParams<"tab">();

  return tab;
};
