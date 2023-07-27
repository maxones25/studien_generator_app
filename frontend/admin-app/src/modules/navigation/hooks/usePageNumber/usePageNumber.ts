import { usePathParam } from "..";

export const usePageNumber = () => {
  const pageNumber = usePathParam("pageNumber");
  return parseInt(pageNumber);
};
