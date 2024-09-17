import { IParametersIn, StateOptionsWithFn, StateResult } from "../types";
export declare function useStore<T>(params: string | IParametersIn<T>, initialState?: StateOptionsWithFn<T>): StateResult<T>;
