import { useAccessTokenContext } from "@modules/auth/contexts";
import { WriteQueryFunction } from "@modules/core/types";
import { RequestHeader } from "@modules/core/utils";
import {
  QueryClient,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "react-query";

export interface WriteRequestOnSuccessOptions<InputData, OutputData> {
  queryClient: QueryClient;
  data: OutputData;
  variables: InputData;
  context: unknown;
}

export interface UseWriteRequestOptions<InputData, OutputData> {
  onSuccess?: (
    options: WriteRequestOnSuccessOptions<InputData, OutputData>
  ) => void;
  queryOptions?: UseMutationOptions<OutputData, unknown, InputData>;
}

export const useWriteRequest = <InputData, OutputData>(
  queryFunc: WriteQueryFunction<InputData, OutputData>,
  options?: UseWriteRequestOptions<InputData, OutputData>
) => {
  const { queryOptions, onSuccess } = options || {};

  const queryClient = useQueryClient();
  const accessToken = useAccessTokenContext();

  return useMutation<OutputData, unknown, InputData>(
    (data) => {
      const headers: RequestHeader = {};

      if (accessToken.isValid) {
        headers["Authorization"] = `Bearer ${accessToken.value}`;
      }

      if (typeof data === "object") {
        headers["Content-Type"] = `application/json`;
      }

      return queryFunc({ headers, body: data });
    },
    {
      ...queryOptions,
      onSuccess: (data, variables, context) => {
        if (onSuccess) {
          onSuccess({ data, variables, context, queryClient });
        }
      },
    }
  );
};
