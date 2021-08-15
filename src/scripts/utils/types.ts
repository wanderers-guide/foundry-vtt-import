export type Exact<T, U> = T & Record<Exclude<keyof U, keyof T>, never>;
