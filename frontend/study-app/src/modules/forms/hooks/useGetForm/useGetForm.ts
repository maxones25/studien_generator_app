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
            type: "Text",
          },
          {
            id: "4",
            label: "Name4",
            type: "Boolean",
          },          {
            id: "9",
            label: "Name9",
            type: "Date",
          }]
        }, {
          title: "page2",
          components: [{
            id: "2",
            label: "Name2",
            type: "Enum",
            attributes: {
              options: [
                {value: "hallo", label: "hallo"}, 
                {value: "hello", label: "hello"},
              ]
            }
          }]
        }, {
          title: "page3",
          components: [{
            id: "3",
            label: "Name3",
            type: "Number",
            attributes: {
              min: 1,
              max: 7,
            }
          }]
        }]
      })
    })  
  //apiRequest(`/forms/${formId}`, { ...options })
  );
}