import { useStore } from "../state";
import { IParametersIn, StateResult } from "../types";

function sendRequest<TData = unknown, TResult = unknown, TResultData = TData>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: TData,
  extract?: string | ((result: TResult) => TResultData)
): Promise<TResultData> {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data: TResult) => {
      let result: TResultData | undefined = undefined;
      if (extract instanceof Function) {
        result = extract(data);
      } else if (typeof extract === "string") {
        result = (data as Record<string, unknown>)[extract] as TResultData;
      } else {
        result = data as unknown as TResultData;
      }

      return result as TResultData;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useRest<
  TData = unknown,
  TResult = unknown,
  TResultData = TData
>(
  params: IParametersIn<TResultData>,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: TData,
  extract?: string | ((result: TResult) => TResultData)
): StateResult<TResultData> {
  params.initialState = sendRequest<TData, TResult, TResultData>(
    method,
    url,
    data,
    extract
  );
  return useStore<TResultData>(params);
}

export function useRestPost<
  TData = unknown,
  TResult = unknown,
  TResultData = TData
>(
  params: IParametersIn<TResultData>,
  url: string,
  data: TData,
  extract?: string | ((result: TResult) => TResultData)
): StateResult<TResultData> {
  return useRest<TData, TResult, TResultData>(
    params,
    "POST",
    url,
    data,
    extract
  );
}

export function useRestGet<
  TData = unknown,
  TResult = unknown,
  TResultData = TData
>(
  params: IParametersIn<TResultData>,
  url: string,
  data: TData,
  extract?: string | ((result: TResult) => TResultData)
): StateResult<TResultData> {
  return useRest<TData, TResult, TResultData>(
    params,
    "GET",
    url,
    data,
    extract
  );
}

export function useRestPut<
  TData = unknown,
  TResult = unknown,
  TResultData = TData
>(
  params: IParametersIn<TResultData>,
  url: string,
  data: TData,
  extract?: string | ((result: TResult) => TResultData)
): StateResult<TResultData> {
  return useRest<TData, TResult, TResultData>(
    params,
    "PUT",
    url,
    data,
    extract
  );
}

export function useRestDelete<
  TData = unknown,
  TResult = unknown,
  TResultData = TData
>(
  params: IParametersIn<TResultData>,
  url: string,
  data: TData,
  extract?: string | ((result: TResult) => TResultData)
): StateResult<TResultData> {
  return useRest<TData, TResult, TResultData>(
    params,
    "DELETE",
    url,
    data,
    extract
  );
}

export function useRestPatch<
  TData = unknown,
  TResult = unknown,
  TResultData = TData
>(
  params: IParametersIn<TResultData>,
  url: string,
  data: TData,
  extract?: string | ((result: TResult) => TResultData)
): StateResult<TResultData> {
  return useRest<TData, TResult, TResultData>(
    params,
    "PATCH",
    url,
    data,
    extract
  );
}
