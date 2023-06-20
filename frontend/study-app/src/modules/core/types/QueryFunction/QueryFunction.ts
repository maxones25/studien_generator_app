import { RequestHeader } from "@modules/core/utils";

export type ReadQueryFunction<OutputData> = (options: {
  headers: RequestHeader;
}) => Promise<OutputData>;

export type WriteQueryFunction<InputData, OutputData> = (options: {
  headers: RequestHeader;
  body: InputData;
}) => Promise<OutputData>;
