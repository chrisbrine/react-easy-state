import {
  IParameters,
  IParametersOut,
  ManipulateStateFunction,
  SetStateFn,
  StoreData,
} from "../types";
import { addActions } from "./action";
import {
  addMiddleware,
  addMiddlewares,
  handleMiddleware,
  hasMiddleware,
} from "./middleware";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Store: Record<string, StoreData<any>> = {};

window.addEventListener("storage", (event) => {
  if (event.key && event.key.startsWith("store-")) {
    const storeName = event.key.split("store-")[1];
    const store = getStore(storeName);
    try {
      const newState = JSON.parse(event.newValue as string);
      if (store && store.state !== newState) {
        setStore(storeName, newState);
      }
    } catch (e) {
      console.error(e);
    }
  }
});

function localStorageName(storeName: string) {
  return `store-${storeName}`;
}

function setupStore<T>(params: IParameters<T>) {
  if (Store[params.storeName]) {
    console.error(
      `Store with name ${params.storeName} already exists. Recreating...`
    );
  }

  const newStoreData: StoreData<T> = {
    state: params.initialState,
    persistent: params.persistent || false,
    subscribers: [],
    middleware: [],
    actions: {},
  };

  if (params.persistent) {
    const storedState = localStorage.getItem(
      localStorageName(params.storeName)
    );
    if (storedState) {
      try {
        newStoreData.state = JSON.parse(storedState);
      } catch {
        newStoreData.state = params.initialState;
      }
    }
  } else {
    localStorage.removeItem(localStorageName(params.storeName));
  }

  Store[params.storeName] = newStoreData as StoreData<T>;
}

export function createStore<T>(params: IParametersOut<T>): void {
  if (params.asyncState && params.initialState instanceof Promise) {
    setupStore<T>({
      ...params,
      initialState: undefined as T,
    });
    params.initialState.then((result) => {
      setStore(params.storeName, result);
    });
  } else {
    setupStore<T>({
      ...params,
      initialState: params.initialState as T,
    });
  }
  if (params.actions) {
    addActions<T>(
      params.storeName,
      params.actions as Record<string, ManipulateStateFunction<T>>
    );
  }
  if (params.middleware) {
    if (Array.isArray(params.middleware)) {
      addMiddlewares(params.storeName, params.middleware);
    } else {
      addMiddleware(params.storeName, params.middleware);
    }
  }
}

export function triggerStore<T>(storeName: string) {
  const store = Store[storeName];
  store.subscribers.forEach((subscriber: SetStateFn<T>) => {
    subscriber(store.state);
  });
}

export function getStore<T>(storeName: string): StoreData<T> {
  return Store[storeName] as StoreData<T>;
}

export function storeExists(storeName: string): boolean {
  return Store[storeName] !== undefined;
}

function setStoreData<T>(storeName: string, newState: T) {
  const store = getStore<T>(storeName);
  store.state = newState;
  if (hasMiddleware<T>(storeName)) {
    newState = handleMiddleware<T>(storeName, newState);
  }
  if (store.persistent) {
    localStorage.setItem(localStorageName(storeName), JSON.stringify(newState));
  }
  triggerStore<T>(storeName);
}

export function setStore<T>(storeName: string, newState: T | Promise<T>) {
  if (newState instanceof Promise) {
    newState.then((result) => {
      setStoreData(storeName, result);
    });
  } else {
    setStoreData(storeName, newState);
  }
}

export function deleteStore(storeName: string) {
  localStorage.removeItem(localStorageName(storeName));
  delete Store[storeName];
}

export const stores = Object.keys(Store)[Symbol.iterator]();
