export type Not<T extends boolean> = T extends true ? false : true;

export function not<T extends boolean>(value: T): Not<T> {
  return !value as Not<T>;
}
export function has(value: unknown): value is true {
  return !!value;
}
