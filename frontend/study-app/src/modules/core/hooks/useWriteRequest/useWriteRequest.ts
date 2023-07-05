import { useAccessTokenContext } from "@modules/auth/contexts";
import {
  SnackBarContextValue,
  useSnackBarContext,
} from "@modules/core/contexts";
import { ApiError, WriteQueryFunction } from "@modules/core/types";
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
  snackbar: SnackBarContextValue;
}

export interface WriteRequestOnErrorOptions<InputData, ErrorData> {
  queryClient: QueryClient;
  error: ErrorData;
  variables: InputData;
  context: unknown;
  snackbar: SnackBarContextValue;
}

export interface UseWriteRequestOptions<InputData, OutputData, ErrorData> {
  onSuccess?: (
    options: WriteRequestOnSuccessOptions<InputData, OutputData>
  ) => void;
  onError?: (options: WriteRequestOnErrorOptions<InputData, ErrorData>) => void;
  queryOptions?: UseMutationOptions<OutputData, unknown, InputData>;
}

export const useWriteRequest = <
  InputData,
  OutputData,
  ErrorData extends ApiError = ApiError
>(
  queryFunc: WriteQueryFunction<InputData, OutputData>,
  options?: UseWriteRequestOptions<InputData, OutputData, ErrorData>
) => {
  const { queryOptions, onSuccess, onError } = options || {};

  const queryClient = useQueryClient();
  const accessToken = useAccessTokenContext();
  const snackbar = useSnackBarContext();

  return useMutation<OutputData, ErrorData, InputData>(
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
          onSuccess({ data, variables, context, queryClient, snackbar });
        }
      },
      onError: (error, variables, context) => {
        if (onError) {
          onError({ error, variables, context, queryClient, snackbar });
        } else {
          snackbar.showError(error.message);
        }
      },
    }
  );
};
