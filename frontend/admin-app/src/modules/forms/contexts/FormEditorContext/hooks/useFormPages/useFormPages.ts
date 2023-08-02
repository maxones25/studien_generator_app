import { FormPage } from "@modules/formPages/types";
import { useMemo } from "react";

export type EnhancedFormPage = {
  data: FormPage;
  isSelected: boolean;
};

export type UseFormPagesResult = EnhancedFormPage[];

export const useFormPages = (
  formPages: FormPage[],
  pageId: string
): UseFormPagesResult =>
  useMemo(
    () =>
      formPages.map((data) => ({
        data,
        isSelected: pageId === data.id,
      })),
    [formPages, pageId]
  );
