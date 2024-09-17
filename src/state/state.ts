import { useState, useEffect } from "react";
import { getStore, setStore, createStore } from "./store";
import {
  IParametersIn,
  IParametersOut,
  ManipulateFn,
  StateOptionsWithFn,
  StateResult,
} from "../types";
import { handleParameters } from "./params";
import { getActions } from "./action";
import { handleMiddleware, hasMiddleware } from "./middleware";

export function useStore<T>(
  params: string | IParametersIn<T>,
  initialState?: StateOptionsWithFn<T>
): StateResult<T> {
  const data: IParametersOut<T> = (
    typeof params === "string"
      ? handleParameters(params, initialState)
      : handleParameters(params)
  ) as IParametersOut<T>;
  let store = getStore<T>(data.storeName);

  if (!store) {
    if (!params) {
      throw new Error(`Store ${data.storeName} does not exist`);
    }
    createStore<T>(data);
    store = getStore<T>(data.storeName);
  }

  const subscriber = useState<T>(store.state)[1];

  const setState = (newState: T) => {
    if (hasMiddleware<T>(data.storeName)) {
      newState = handleMiddleware(data.storeName, newState);
    }
    setStore(data.storeName, newState);
  };

  useEffect(() => {
    store.subscribers.push(subscriber);

    return () => {
      store.subscribers = store.subscribers.filter((li) => li !== subscriber);
    };
  }, [subscriber]);

  const actions: ManipulateFn[] = Object.values(getActions<T>(data.storeName));

  return [store.state, setState, ...actions];
}
