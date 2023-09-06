import { useAccessTokenContext } from "@modules/auth/contexts";
import {
  SnackBarContextValue,
  useSnackBarContext,
} from "@modules/core/contexts";
import { ApiError, WriteQueryFunction } from "@modules/core/types";
import { RequestHeader } from "@modules/core/utils";
import { useTranslation } from "react-i18next";
import {
  QueryClient,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from "react-query";

export interface WriteRequestOnSuccessOptions<InputData, OutputData> {
  queryClient: QueryClient;
  data: OutputData;
  variables: InputData;
  context: unknown;
  snackbar: SnackBarContextValue;
}

export type WriteRequestOnSettledReturnValue = {
  text: string;
  params: Record<string, string>;
};

export interface WriteRequestOnErrorOptions<InputData, ErrorData> {
  queryClient: QueryClient;
  error: ErrorData;
  variables: InputData;
  context: unknown;
  snackbar: SnackBarContextValue;
}

export interface WriteRequestOnSettledOptions<
  InputData,
  OutputData,
  ErrorData
> {
  queryClient: QueryClient;
  data?: OutputData;
  error: ErrorData | null;
  variables: InputData;
  context: unknown;
}

export interface UseWriteRequestOptions<InputData, OutputData, ErrorData> {
  onSuccess?: (
    options: WriteRequestOnSuccessOptions<InputData, OutputData>
  ) => WriteRequestOnSettledReturnValue | void;
  onError?: (options: WriteRequestOnErrorOptions<InputData, ErrorData>) => void;
  queryOptions?: UseMutationOptions<OutputData, unknown, InputData>;
  onMutate?: (variables: InputData, queryClient: QueryClient) => void;
  onSettled?: (
    options: WriteRequestOnSettledOptions<InputData, OutputData, ErrorData>
  ) => void | WriteRequestOnSettledReturnValue;
}

export type UseWriteRequestResult<
  InputData,
  OutputData,
  ErrorData extends ApiError = ApiError
> = UseMutationResult<OutputData, ErrorData, InputData>;

export const useWriteRequest = <
  InputData,
  OutputData,
  ErrorData extends ApiError = ApiError
>(
  queryFunc: WriteQueryFunction<InputData, OutputData>,
  options?: UseWriteRequestOptions<InputData, OutputData, ErrorData>
): UseWriteRequestResult<InputData, OutputData, ErrorData> => {
  const { queryOptions, onSuccess, onError, onMutate, onSettled } =
    options || {};

  const { t } = useTranslation();
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
      onMutate: (variables) => {
        if (onMutate) {
          onMutate(variables, queryClient);
        }
      },
      onSettled: (data, error, variables, context) => {
        if (onSettled) {
          const snackbarConfig = onSettled({
            context,
            data,
            error,
            queryClient,
            variables,
          });
          if (snackbarConfig) {
            const params = Object.keys(snackbarConfig.params).reduce<
              Record<string, string>
            >((obj, key) => {
              obj[key] = t(snackbarConfig.params[key]);
              return obj;
            }, {});
            snackbar.showSuccess(t(snackbarConfig.text, params));
          }
        }
      },
      onSuccess: (data, variables, context) => {
        if (onSuccess) {
          const snackbarConfig = onSuccess({
            data,
            variables,
            context,
            queryClient,
            snackbar,
          });
          if (snackbarConfig) {
            const params = Object.keys(snackbarConfig.params).reduce<
              Record<string, string>
            >((obj, key) => {
              obj[key] = t(snackbarConfig.params[key]);
              return obj;
            }, {});
            snackbar.showSuccess(t(snackbarConfig.text, params));
          }
        }
      },
      onError: (error, variables, context) => {
        if (onError) {
          onError({ error, variables, context, queryClient, snackbar });
        } else {
          const translatedMessage = t(error.message);
          const isSame = translatedMessage === error.message;
          snackbar.showError(isSame ? t("server error") : translatedMessage);
        }
      },
    }
  );
};
