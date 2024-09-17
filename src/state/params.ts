import {
  IParametersIn,
  IParametersOut,
  StateOptionFns,
  StateOptionsWithFn,
  StateOptionsWithoutFn,
} from "../types";

export function handleParameters<T>(storeName: string): IParametersOut<T>;
export function handleParameters<T>(
  storeName: string,
  initialState: StateOptionsWithFn<T>
): IParametersOut<T>;
export function handleParameters<T>(
  params: IParametersIn<T>
): IParametersOut<T>;

export function handleParameters<T>(
  params: string | IParametersIn<T>,
  initialState?: StateOptionsWithFn<T>
): IParametersOut<T> {
  if (typeof params === "string") {
    params = {
      storeName: params,
      initialState: initialState as StateOptionsWithFn<T>,
    } as IParametersIn<T>;
  }
  if (typeof params.initialState === "function") {
    params.initialState = (params.initialState as StateOptionFns<T>)();
  }

  const result: IParametersOut<T> = {
    ...params,
    initialState: params.initialState as StateOptionsWithoutFn<T>,
    asyncState: false,
  };

  if (result.initialState instanceof Promise) {
    result.asyncState = true;
  }

  return result;
}
