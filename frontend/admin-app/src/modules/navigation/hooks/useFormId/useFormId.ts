import { usePathParam } from "..";

export const useFormId = (required = true) =>
  usePathParam("formId", required);
