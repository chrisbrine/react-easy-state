export type ManipulateStateFunction<T> = (
  state: T,
  ...args: unknown[]
) => T | Promise<T>;
export type ManipulateFn = (...args: unknown[]) => void;
export type MiddlewareFn<T> = (state: T) => T;
export type StateFn<T> = (state: T) => void;
export type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;
export type StateResult<T> = [T, StateFn<T>, ...ManipulateFn[]];

export interface StoreData<T> {
  state: T;
  persistent: boolean;
  subscribers: SetStateFn<T>[];
  middleware: MiddlewareFn<T>[];
  actions: Record<string, ManipulateFn>;
}
