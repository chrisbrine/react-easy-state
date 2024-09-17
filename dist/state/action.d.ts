import { ManipulateStateFunction } from "../types";
export declare const addAction: <T>(storeName: string, name: string, action: ManipulateStateFunction<T>) => void;
export declare const addActions: <T = unknown>(storeName: string, actions: Record<string, ManipulateStateFunction<T>>) => void;
export declare const removeAction: (storeName: string, name: string) => void;
export declare const removeActions: (storeName: string, names: string[]) => void;
export declare const getActions: <T>(storeName: string) => Record<string, import("../types").ManipulateFn>;
type ActionArgs<T> = [string, ManipulateStateFunction<T>];
export declare const createActions: <T>(...args: ActionArgs<T>[]) => Record<string, ManipulateStateFunction<T>>;
export {};
