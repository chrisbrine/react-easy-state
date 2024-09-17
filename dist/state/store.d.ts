import { IParametersOut, StoreData } from "../types";
export declare function createStore<T>(params: IParametersOut<T>): void;
export declare function triggerStore<T>(storeName: string): void;
export declare function getStore<T>(storeName: string): StoreData<T>;
export declare function storeExists(storeName: string): boolean;
export declare function setStore<T>(storeName: string, newState: T | Promise<T>): void;
export declare function deleteStore(storeName: string): void;
export declare const stores: IterableIterator<string>;
