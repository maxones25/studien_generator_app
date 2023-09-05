export interface UseCase<Input, Output> {
  execute(input: Input): Output;
}
