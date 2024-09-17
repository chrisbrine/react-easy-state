import { MiddlewareFn } from "../types";
import { getStore } from "./store";

export const addMiddleware = <T>(
  storeName: string,
  middleware: MiddlewareFn<T>
) => {
  const store = getStore<T>(storeName);
  store.middleware.push(middleware as MiddlewareFn<T>);
};

export const addMiddlewares = <T>(
  storeName: string,
  middlewares: MiddlewareFn<T>[]
) => {
  middlewares.forEach((middleware) => addMiddleware<T>(storeName, middleware));
};

export const handleMiddleware = <T>(storeName: string, state: T): T => {
  const store = getStore<T>(storeName);
  store.middleware.forEach((middleware) => (state = middleware(state)));
  return state;
};

export const hasMiddleware = <T>(storeName: string): boolean => {
  const store = getStore<T>(storeName);
  return store.middleware.length > 0;
};
