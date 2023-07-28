import { Component } from "@modules/components/types";
import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export const getGetComponentsKey = () => ["getComponents"];

export const useGetComponents = () => {
  return useReadRequest<Component[]>(getGetComponentsKey(), (options) =>
    apiRequest(`/components`, { ...options })
  );
};
