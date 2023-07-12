import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormData } from "@modules/forms/types";

export interface UseGetFormOptions {
  formId: string
}

export const getGetFormKey = () => ["getForm"];

export const useGetForm = (options? : UseGetFormOptions) => {
  const formId = options?.formId;
  return useReadRequest<FormData>(getGetFormKey(), (options) =>
    new Promise((resolve, reject) => {
      resolve({
        id: "1",
        name: "form",
        pages: [{
          title: "page1",
          components: [{
            id: "1",
            label: "Name1",
            type: "text",
          }]
        }, {
          title: "page2",
          components: [{
            id: "2",
            label: "Name2",
            type: "text",
          }]
        }, {
          title: "page3",
          components: [{
            id: "3",
            label: "Name3",
            type: "text",
          }]
        }]
      })
    })  
  //apiRequest(`/forms/${formId}`, { ...options })
  );
}