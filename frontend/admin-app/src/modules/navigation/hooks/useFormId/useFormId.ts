import { usePathParam } from "..";

export const useFormId = (required: boolean = true) =>
  usePathParam("formId", required);
