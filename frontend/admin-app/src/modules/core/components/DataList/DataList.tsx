import { UseReadRequestResult } from "@modules/core/hooks";
import { Column, Text } from "..";
import { CircularProgress, List } from "@mui/material";

export interface DataListProps<Data> {
  client: UseReadRequestResult<Data[]>;
  errorText: string;
  noDataText: string;
  renderItem: (
    item: Data,
    options: { i: number; arr: Data[]; isLast: boolean }
  ) => JSX.Element;
}

export function DataList<Data>({
  client,
  errorText,
  noDataText,
  renderItem,
}: DataListProps<Data>) {
  const { isLoading, isError, data } = client;

  const hasData = (data?.length ?? 0) > 0;

  return (
    <Column alignItems="center" p={1} boxShadow={1} borderRadius={1}>
      {isLoading ? (
        <CircularProgress data-testid="loading spinner" />
      ) : isError ? (
        <Text data-testid="error-text" color="error.main">
          {errorText}
        </Text>
      ) : !hasData ? (
        <Text>{noDataText}</Text>
      ) : (
        <List sx={{ width: "100%" }}>
          {data?.map((item, i, arr) =>
            renderItem(item, { i, arr, isLast: i === arr.length - 1 })
          )}
        </List>
      )}
    </Column>
  );
}
