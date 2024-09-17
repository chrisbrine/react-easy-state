import { IParametersIn, IParametersOut, StateOptionsWithFn } from "../types";
export declare function handleParameters<T>(storeName: string): IParametersOut<T>;
export declare function handleParameters<T>(storeName: string, initialState: StateOptionsWithFn<T>): IParametersOut<T>;
export declare function handleParameters<T>(params: IParametersIn<T>): IParametersOut<T>;
