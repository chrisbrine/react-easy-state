import { ManipulateStateFunction, MiddlewareFn } from "./state";
export type StateOptionFns<T> = (() => T) | (() => Promise<T>);
export type StateOptionsWithFn<T> = T | Promise<T> | StateOptionFns<T>;
export type StateOptionsWithoutFn<T> = T | Promise<T>;
export interface IParametersBase<T> {
    storeName: string;
    persistent?: boolean;
    actions?: Record<string, ManipulateStateFunction<T>>;
    fillerValue?: T;
    middleware?: MiddlewareFn<T> | MiddlewareFn<T>[];
}
export interface IParametersIn<T> extends IParametersBase<T> {
    initialState: StateOptionsWithFn<T>;
}
export interface IParametersOut<T> extends IParametersBase<T> {
    initialState: StateOptionsWithoutFn<T>;
    asyncState: boolean;
}
export interface IParameters<T> extends IParametersBase<T> {
    storeName: string;
    initialState: T;
    persistent?: boolean;
}
