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
  useQueryClient,
} from "react-query";

export interface WriteRequestOnSuccessOptions<InputData, OutputData> {
  queryClient: QueryClient;
  data: OutputData;
  variables: InputData;
  context: unknown;
  snackbar: SnackBarContextValue;
}

export type WriteRequestOnSuccessReturnValue = {
  text: "record created" | "record deleted" | "record added" | string;
  params: Record<string, string>;
};

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
  ) => WriteRequestOnSuccessReturnValue | void;
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
            console.log(params);
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
