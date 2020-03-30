import { Option, isSome } from 'fp-ts/lib/Option'

export const fromOption = <T>(input: Option<T>) => (
  isSome(input) ? input.value : null
)