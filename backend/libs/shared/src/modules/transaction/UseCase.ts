export interface UseCase<Input> {
  run(input: Input);
}
