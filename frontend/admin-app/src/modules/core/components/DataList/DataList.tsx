import { UseReadRequestResult } from "@modules/core/hooks";
import { Column, Text } from "..";
import { CircularProgress, List } from "@mui/material";

export interface DataListProps<Data> {
  client: UseReadRequestResult<Data[]>;
  errorText: string;
  noDataText: string;
  items?: Data[];
  renderItem: (
    item: Data,
    options: { i: number; arr: Data[]; isLast: boolean }
  ) => JSX.Element;
  disablePadding?: boolean;
}

export function DataList<Data>({
  client,
  errorText,
  noDataText,
  renderItem,
  disablePadding = false,
}: DataListProps<Data>) {
  const { isLoading, isError, data } = client;

  const hasData = (data?.length ?? 0) > 0;

  return (
    <Column
      alignItems="center"
      position="relative"
      sx={{ overflowY: "hidden" }}
    >
      {isLoading ? (
        <CircularProgress data-testid="loading spinner" />
      ) : isError ? (
        <Text data-testid="error-text" color="error.main">
          {errorText}
        </Text>
      ) : !hasData ? (
        <Text>{noDataText}</Text>
      ) : (
        <List
          sx={{ width: "100%", overflowY: "scroll" }}
          disablePadding={disablePadding}
        >
          {data?.map((item, i, arr) =>
            renderItem(item, { i, arr, isLast: i === arr.length - 1 })
          )}
        </List>
      )}
    </Column>
  );
}
