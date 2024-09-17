import { ManipulateStateFunction } from "../types";
import { getStore, setStore } from "./store";

export const addAction = <T>(
  storeName: string,
  name: string,
  action: ManipulateStateFunction<T>
) => {
  const store = getStore(storeName);
  store.actions[name] = (...args) => {
    const newState = action(store.state as T, ...args);
    setStore(storeName, newState);
  };
};

export const addActions = <T = unknown>(
  storeName: string,
  actions: Record<string, ManipulateStateFunction<T>>
) => {
  Object.entries(actions).forEach(([name, action]) =>
    addAction<T>(storeName, name, action)
  );
};

export const removeAction = (storeName: string, name: string) => {
  const store = getStore(storeName);
  delete store.actions[name];
};

export const removeActions = (storeName: string, names: string[]) => {
  names.forEach((name) => removeAction(storeName, name));
};

export const getActions = <T>(storeName: string) => {
  return getStore<T>(storeName).actions;
};

type ActionArgs<T> = [string, ManipulateStateFunction<T>];

export const createActions = <T>(
  ...args: ActionArgs<T>[]
): Record<string, ManipulateStateFunction<T>> => {
  const result: Record<string, ManipulateStateFunction<T>> = {};
  args.forEach(([name, action]) => {
    result[name] = action as ManipulateStateFunction<T>;
  });
  return result;
};
