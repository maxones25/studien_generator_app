import { useAccessTokenContext } from "@modules/auth/contexts";
import { WriteQueryFunction } from "@modules/core/types";
import { RequestHeader } from "@modules/core/utils";
import { useMutation, UseMutationOptions } from "react-query";

export interface UseWriteRequestOptions<InputData, OutputData>
  extends UseMutationOptions<OutputData, unknown, InputData> {}

export const useWriteRequest = <InputData, OutputData>(
  queryFunc: WriteQueryFunction<InputData, OutputData>,
  options?: UseWriteRequestOptions<InputData, OutputData>
) => {
  const accessToken = useAccessTokenContext();

  return useMutation<OutputData, unknown, InputData>((data) => {
    const headers: RequestHeader = {};

    if (accessToken.isValid) {
      headers["Authorization"] = `Bearer ${accessToken.value}`;
    }

    if (typeof data === "object") {
      headers["Content-Type"] = `application/json`;
    }

    return queryFunc({ headers, body: data });
  }, options);
};
