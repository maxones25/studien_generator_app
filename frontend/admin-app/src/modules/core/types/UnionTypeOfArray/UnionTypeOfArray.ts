export type UnionTypeOfArray<
  Data extends Array<Record<string, any>>,
  Key extends string
> = Data[number][Key];
