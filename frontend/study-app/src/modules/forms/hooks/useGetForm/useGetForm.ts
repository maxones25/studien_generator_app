import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { MultiFormData } from "@modules/forms/types";

export interface UseGetFormOptions {
  formId: string
}

export const getGetFormKey = () => ["getForm"];

export const useGetForm = (options? : UseGetFormOptions) => {
  const formId = options?.formId;
  return useReadRequest<MultiFormData>(getGetFormKey(), (options) =>
    new Promise((resolve, reject) => {
      resolve({
        title: "multifrom",
        pages: [{
          name: "page1",
          fields: [{
            name: "Name1",
            type: "text",
          }]
        }, {
          name: "page2",
          fields: [{
            name: "Name2",
            type: "text",
          }]
        }, {
          name: "page3",
          fields: [{
            name: "Name3",
            type: "text",
          }]
        }]
      })
    })  
  //apiRequest(`/forms/${formId}`, { ...options })
  );
}