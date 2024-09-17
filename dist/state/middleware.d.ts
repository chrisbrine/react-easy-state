import { MiddlewareFn } from "../types";
export declare const addMiddleware: <T>(storeName: string, middleware: MiddlewareFn<T>) => void;
export declare const addMiddlewares: <T>(storeName: string, middlewares: MiddlewareFn<T>[]) => void;
export declare const handleMiddleware: <T>(storeName: string, state: T) => T;
export declare const hasMiddleware: <T>(storeName: string) => boolean;
